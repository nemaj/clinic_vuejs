<template>
  <v-layout row justify-center>
    <!-- <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable> -->
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ isInsert ? 'Add' : 'Edit' }} Today's Misc Result for User ID {{ local_user_id }}
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <div class="text-center" v-show="isLoading">
            <img src="@/assets/images/loading.gif" class="img-fluid" />
          </div>

          <v-container grid-list-md  v-show="!isLoading">
            <v-layout wrap>

              <v-flex xs12 sm6>
                <v-text-field label="Dengue Duo Test Specimen" v-model="dengue_duo_test">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Dengue Duo Test Result" v-model="dengue_duo_test_result">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Pregnancy Test Specimen" v-model="pregnancy_test">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Pregnancy Test Result" v-model="pregnancy_test_result">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="VDRL Specimen" v-model="vdrl"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="VDRL Result" v-model="vdrl_result"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="HBsAg Specimen" v-model="hbsag"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="HBsAg Result" v-model="hbsag_result"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="HAV Specimen" v-model="hav"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="HAV Result" v-model="hav_result"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!--v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn-->
          <v-btn color="blue darken-1" flat @click.native="saveOtherInfo" :disabled="inserted">
            {{ isInsert ? 'Add' : 'Save' }} Test Result
          </v-btn>
        </v-card-actions>
      </v-card>
    <!-- </v-dialog> -->


  <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </v-layout>
</template>

<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import SuccessAlert from "../../Components/Alerts/Success.vue";
import moment from 'moment';

export default {
  components:{
    SuccessAlert,
    ErrorAlert
  },
  props: ['user_id'],
  data: () => ({
    isSuccessDialog: false,
    isErrorDialog: false,
    isLoading: false,
    success_message: '',
    errors: [],
    isInsert: true,
    inserted: false,
    unique_id: 0,
    local_user_id: 0,
    dengue_duo_test: '',
    dengue_duo_test_result: '',
    pregnancy_test: '',
    pregnancy_test_result: '',
    vdrl: '',
    vdrl_result: '',
    hbsag: '',
    hbsag_result: '',
    hav: '',
    hav_result: '',
    rules: {required: value => !!value || 'Required.'}
  }),
  mounted(){
    this.local_user_id = this.user_id;
    this.getLabResultToday();
  },
  methods: {
    saveOtherInfo(){
      if (this.isInsert) {
        this.insertLabResult();
      } else {
        this.updateLabResult();
      }
    },
    updateLabResult(){
      this.isLoading = true;

      axios.put('/api/misc_lab_results/'+this.unique_id,{
        user_id: this.local_user_id,
        dengue_duo_test: this.dengue_duo_test,
        dengue_duo_test_result: this.dengue_duo_test_result,
        pregnancy_test: this.pregnancy_test,
        pregnancy_test_result: this.pregnancy_test_result,
        vdrl: this.vdrl,
        vdrl_result: this.vdrl_result,
        hbsag: this.hbsag,
        hbsag_result: this.hbsag_result,
        hav: this.hav,
        hav_result: this.hav_result
      })
      .then((res) => {
        this.isLoading = false;
        // this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Misc Result updated successfully";
        // this.$emit('result-updated');
        this.print();
      })
      .catch((error) => {
          this.isErrorDialog = true;
          this.isLoading = false;
          this.errors = [];
          this.errors.push(error);

          if (error.response.data.errors !== undefined) {          
            Object.entries(error.response.data.errors).forEach(
                ([key, value]) => this.errors.push(value.toString())
            );
          }
      });
    },
    insertLabResult(){
      this.inserted = true;
      this.isLoading = true;

      axios.post('/api/misc_lab_results',{
        user_id: this.local_user_id,
        dengue_duo_test: this.dengue_duo_test,
        dengue_duo_test_result: this.dengue_duo_test_result,
        pregnancy_test: this.pregnancy_test,
        pregnancy_test_result: this.pregnancy_test_result,
        vdrl: this.vdrl,
        vdrl_result: this.vdrl_result,
        hbsag: this.hbsag,
        hbsag_result: this.hbsag_result,
        hav: this.hav,
        hav_result: this.hav_result
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Misc Result inserted successfully";
        this.$emit('result-updated');
        this.getLabResultToday();
        this.unique_id = res.data.id;
        this.print();
      })
      .catch((error) => {
          this.isErrorDialog = true;
          this.isLoading = false;
          this.errors = [];
          this.errors.push(error);

          if (error.response.data.errors !== undefined) {          
            Object.entries(error.response.data.errors).forEach(
                ([key, value]) => this.errors.push(value.toString())
            );
          }
      });
    },
    getLabResultToday(){
        this.isLoading = true;

        axios.get('/api/misc_lab_results?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
          this.isLoading = false;
          this.inserted = false;

          if (res.data.data.length) {
            this.isInsert = false;
            this.unique_id = res.data.data[0].id;
            this.dengue_duo_test = res.data.data[0].dengue_duo_test;
            this.dengue_duo_test_result = res.data.data[0].dengue_duo_test_result;
            this.pregnancy_test = res.data.data[0].pregnancy_test;
            this.pregnancy_test_result = res.data.data[0].pregnancy_test_result;
            this.vdrl = res.data.data[0].vdrl;
            this.vdrl_result = res.data.data[0].vdrl_result;
            this.hbsag = res.data.data[0].hbsag;
            this.hbsag_result = res.data.data[0].hbsag_result;
            this.hav = res.data.data[0].hav;
            this.hav_result = res.data.data[0].hav_result;
          } else {
            this.isInsert = true;
          }
        })      
        .catch((error) => {
            this.isErrorDialog = true;
            this.isLoading = false;
            this.errors = [];
            this.errors.push(error);

            if (error.response.data.errors !== undefined) {          
              Object.entries(error.response.data.errors).forEach(
                  ([key, value]) => this.errors.push(value.toString())
              );
            }
        });
      },
      print(){
        window.open(localStorage.getItem("apiURL")+"/print/miscellaneous?id="+this.unique_id); 
      }
  }/*,
  watch: {
    user_id: function(val){
      console.log("value is: "+val);
      this.local_user_id = this.user_id;
      this.getLabResultToday();
    }
  }*/
}
</script>