<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ created_at }} Special Test of {{ first_name }}
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
                <v-text-field label="HbA1C*" suffix="%" readonly v-model="hba1c"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: hba1c_normal, error: !hba1c_normal}">
                    4-6%
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="PSA*" suffix="mg/dl" readonly v-model="psa"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: psa_normal, error: !psa_normal}">
                    0-4 ng/mL
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="TROP-I*" suffix="ng/ml" readonly v-model="trop_i">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: trop_i_normal, error: !trop_i_normal}">
                    0-0.3 ng/ml
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="TSH*" suffix="mlU/L" readonly v-model="tsh"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: tsh_normal, error: !tsh_normal}">
                    0.3-4.2 mlU/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="T4*" suffix="nmoL/L" readonly v-model="t4"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: t4_normal, error: !t4_normal}">
                    66-181 nmoL/L
                  </v-card-text>
                </v-card>
              </v-flex>              

              <v-flex xs12 sm6>
                <v-text-field label="T3*" suffix="nmoL/L" readonly v-model="t3"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: t3_normal, error: !t3_normal}">
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
          <v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <error-alert v-model="isErrorDialog">{{ error_message }}</error-alert>
  </v-layout>
</template>

<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import ErrorAlert from "../../Components/Alerts/Error.vue";
  
export default {
  components:{
    ErrorAlert
  },
  props: ['value', 'unique_id'],
  data: () => ({
    moment: moment,
    isErrorDialog: false,
    isLoading: false,
    error_message: '',
    local_unique_id: 0,
    first_name: '',
    hba1c: 0,
    hba1c_normal: false,
    psa: 0,
    psa_normal: false,
    trop_i: 0,
    trop_i_normal: false,
    tsh: 0,
    tsh_normal:false,
    t4: 0,
    t4_normal:false,
    t3: 0,
    t3_normal: false
  }),
  methods: {
    getLabResult(){
        this.isLoading = true;

        axios.get('/api/special_test_lab_results/'+this.local_unique_id)
        .then((res) => {
            this.isLoading = false;
          
            this.hba1c = res.data.hba1c;
            this.psa = res.data.psa;
            this.trop_i = res.data.trop_i;
            this.tsh = res.data.tsh;
            this.t4 = res.data.t4;
            this.t3 = res.data.t3;
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
    },
    hba1c: function(val){
      this.hba1c_normal = (val >= 4 && val <= 6 ? true : false);
    },
    psa: function(val) {
      this.psa_normal = (val >= 0 && val <= 4 ? true : false);
    },
    trop_i: function(val) {
      this.trop_i_normal = (val >= 0 && val <= 0.3 ? true : false);
    },
    tsh: function(val) {
      this.tsh_normal = (val >= 0.3 && val <= 4.2 ? true : false);
    },
    t4: function(val) {
      this.t4_normal = (val >= 66 && val <= 181 ? true : false);
    },
    t3: function(val) {
      this.t3_normal = (val >= 1.3 && val <= 3.1 ? true : false);
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
</style>