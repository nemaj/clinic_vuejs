<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ created_at }} Misc Result of {{ first_name }}
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
                <v-text-field label="Dengue Duo Test Specimen*" readonly v-model="dengue_duo_test">
                </v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Dengue Duo Test Result*" readonly v-model="dengue_duo_test_result">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Pregnancy Test Specimen*" readonly v-model="pregnancy_test">
                </v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Pregnancy Test Result*" readonly v-model="pregnancy_test_result">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="VDRL Specimen*" readonly v-model="vdrl"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="VDRL Result*" readonly v-model="vdrl_result"></v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="HBsAg Specimen*" readonly v-model="hbsag"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="HBsAg Result*" readonly v-model="hbsag_result"></v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="HAV Specimen*" readonly v-model="hav"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="HAV Result*" readonly v-model="hav_result"></v-text-field> 
              </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <error-alert v-model="isErrorDialog">{{ error_message }}</error-alert>
  </v-layout>
</template>

<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import moment from 'moment';
  
export default {
  components:{
    ErrorAlert
  },
  props: ['value', 'unique_id'],
  data: () => ({
    isErrorDialog: false,
    isLoading: false,
    error_message: '',
    local_unique_id: 0,
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
    first_name: '',
    created_at: ''
  }),
  methods: {
    getLabResult(){
        this.isLoading = true;

        axios.get('/api/misc_lab_results/'+this.local_unique_id)
        .then((res) => {
            this.isLoading = false;

            this.dengue_duo_test = res.data.dengue_duo_test;
            this.dengue_duo_test_result = res.data.dengue_duo_test_result;
            this.pregnancy_test = res.data.pregnancy_test;
            this.pregnancy_test_result = res.data.pregnancy_test_result;
            this.vdrl = res.data.vdrl;
            this.vdrl_result = res.data.vdrl_result;
            this.hbsag = res.data.hbsag;
            this.hbsag_result = res.data.hbsag_result;
            this.hav = res.data.hav;
            this.hav_result = res.data.hav_result;
            this.created_at = moment(new Date(res.data.created_at)).format("MMM DD, YYYY");
            this.first_name = res.data.user.first_name;        
        })
        .catch(error => {
            this.isErrorDialog = true;
            this.error_message = error;
            this.isLoading = false;
            //alert(error);
            /*if (error.response.data.errors !== undefined) {
              var text = [];

              Object.entries(error.response.data.errors).forEach(
                  ([key, value]) => text.push(value)
              );

              var errorMessage = text.toString().replace(/,/g,"\n");
              alert(text.toString().replace(/,/g,"\n"));
            }*/
            /*if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);*/
        });
      }
  },
  watch: {
    unique_id: function(val){
      console.log("value is: "+val);
      this.local_unique_id = this.unique_id;
      this.getLabResult();
    }
  }
}
</script>