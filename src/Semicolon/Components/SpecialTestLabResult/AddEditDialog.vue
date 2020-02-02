<template>
  <v-layout row justify-center>
    <!-- <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable> -->
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ isInsert ? 'Add' : 'Edit' }} Today's Special Test for User ID {{ local_user_id }}
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
                <h5>Results</h5>
              </v-flex>
              <v-flex xs12 sm6>
                <h5>Normal Values</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="HbA1C" suffix="%"  v-model="hba1c"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="hba1c_normal">
                    4-6%
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="PSA" suffix="mg/dl"  v-model="psa"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="psa_normal">
                    0-4 ng/mL
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="TROP-I" suffix="ng/ml"  v-model="trop_i">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="trop_i_normal">
                    0-0.3 ng/mL
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="TSH" suffix="mlU/L"  v-model="tsh"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="tsh_normal">
                    0.3-4.2 mlU/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="T4" suffix="nmoL/L"  v-model="t4"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="t4_normal">
                    66-181 nmoL/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="T3" suffix="nmoL/L"  v-model="t3"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="t3_normal">
                    1.3-3.1 nmoL/L
                  </v-card-text>
                </v-card>
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
    hba1c: '',
    hba1c_normal: 'blank',
    psa: '',
    psa_normal: 'blank',
    trop_i: '',
    trop_i_normal: 'blank',
    tsh: '',
    tsh_normal: 'blank',
    t4: '',
    t4_normal: 'blank',
    t3: '',
    t3_normal: 'blank',
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

      axios.put('/api/special_test_lab_results/'+this.unique_id,{
        user_id: this.local_user_id,
        hba1c: this.hba1c,
        psa: this.psa,
        trop_i: this.trop_i,
        tsh: this.tsh,
        t4: this.t4,
        t3: this.t3
      })
      .then((res) => {
        this.isLoading = false;
        // this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Special Test updated successfully";
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

      axios.post('/api/special_test_lab_results',{
        user_id: this.local_user_id,
        hba1c: this.hba1c,
        psa: this.psa,
        trop_i: this.trop_i,
        tsh: this.tsh,
        t4: this.t4,
        t3: this.t3
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Special Test inserted successfully";
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

        axios.get('/api/special_test_lab_results?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
          this.isLoading = false;
          this.inserted = false;

          if (res.data.data.length) {
            this.isInsert = false;
            this.unique_id = res.data.data[0].id;
            this.hba1c = res.data.data[0].hba1c;
            this.psa = res.data.data[0].psa;
            this.trop_i = res.data.data[0].trop_i;
            this.tsh = res.data.data[0].tsh;
            this.t4 = res.data.data[0].t4;
            this.t3 = res.data.data[0].t3;
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
        window.open(localStorage.getItem("apiURL")+"/print/special-test?id="+this.unique_id); 
      }
  },
  watch: {
    /*user_id: function(val){
      console.log("value is: "+val);
      this.local_user_id = this.user_id;
      this.getLabResultToday();
    },*/
    hba1c: function(val){
      this.hba1c_normal = (val >= 4 && val <= 6 ? 'success' : (val ? 'error' : 'blank'));
    },
    psa: function(val) {
      this.psa_normal = (val >= 0 && val <= 4 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    trop_i: function(val) {
      this.trop_i_normal = (val >= 0 && val <= 0.3 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    tsh: function(val) {
      this.tsh_normal = (val >= 0.3 && val <= 4.2 ? 'success' : (val ? 'error' : 'blank'));
    },
    t4: function(val) {
      this.t4_normal = (val >= 66 && val <= 181 ? 'success' : (val ? 'error' : 'blank'));
    },
    t3: function(val) {
      this.t3_normal = (val >= 1.3 && val <= 3.1 ? 'success' : (val ? 'error' : 'blank'));
    }
  }
}
</script>
<style>
  .error {
    background-color: red;
    color: white;
  }

  .success {
    background-color: green;
    color: #000000;
  }

  .blank {
    background-color: blue;
    color: white;
  }
</style>