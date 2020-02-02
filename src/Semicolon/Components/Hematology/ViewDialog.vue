<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ created_at }} Hematology of {{ first_name }}
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
                <v-text-field label="WBC*" readonly v-model="wbc"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: wbc_normal, error: !wbc_normal}">
                    4.4 - 11.0 x10<sup>9</sup>/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="RBC*" readonly v-model="rbc"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: rbc_normal, error: !rbc_normal}">
                    4.5 - 5.9 x10<sup>12</sup>/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Hemoglobin*" suffix="g/L" readonly v-model="hemoglobin">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                    M= 14.0 - 17.5 || F = 12.0 - 15.0 g/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Hematocrit*" suffix="/L" readonly v-model="hematocrit">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                    M= 41.0 - 50.0 || F = 36.0 - 45.0 /L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm12 class="text-center">
                <h4><i>Differential Ct.</i></h4>
              </v-flex>
              
              <v-flex xs12 sm6>
                <h5>Results</h5>
              </v-flex>
              <v-flex xs12 sm6>
                <h5>Normal Values</h5>
              </v-flex>
              
              <v-flex xs12 sm6>
                <v-text-field label="Neutrophils (Segmenters)*" readonly v-model="segmenters">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: segmenters_normal, error: !segmenters_normal}">
                    0.50 - 0.70
                  </v-card-text>
                </v-card>
              </v-flex>              

              <v-flex xs12 sm6>
                <v-text-field label="Neutrophils (Stabs)*" readonly v-model="stabs"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: stabs_normal, error: !stabs_normal}">
                    0.01 - 0.03
                  </v-card-text>
                </v-card>
              </v-flex>              

              <v-flex xs12 sm6>
                <v-text-field label="Lymphocytes*" readonly v-model="lymphocytes"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: lymphocytes_normal, error: !lymphocytes_normal}">
                    0.20 - 0.40
                  </v-card-text>
                </v-card>
              </v-flex>              

              <v-flex xs12 sm6>
                <v-text-field label="Monocytes*" readonly v-model="monocytes"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: monocytes_normal, error: !monocytes_normal}">
                    0.03 - 0.09
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="eosinophils*" readonly v-model="eosinophils"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: eosinophils_normal, error: !eosinophils_normal}">
                    0.01 - 0.04
                  </v-card-text>
                </v-card>
              </v-flex>
                            
              <v-flex xs12 sm6>
                <v-text-field label="Basophils*" readonly v-model="basophils"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: basophils_normal, error: !basophils_normal}">
                    0.00 - 0.01
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-textarea label="Others" v-model="others" readonly></v-textarea>
              </v-flex>

              <v-flex xs12 sm12 class="text-center">
                <h4><i>Others</i></h4>
              </v-flex>
              
              <v-flex xs12 sm6>
                <h5>Results</h5>
              </v-flex>
              <v-flex xs12 sm6>
                <h5>Normal Values</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Platelet Ct.*" readonly v-model="platelet_ct"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: platelet_ct_normal, error: !platelet_ct_normal}">
                    150-450 x 10<sup>9</sup>/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Bleeding Time*" suffix="min" readonly v-model="bleeding_time">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: bleeding_time_normal, error: !bleeding_time_normal}">
                    1-3 min
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Clotting Time*" suffix="min" readonly v-model="clotting_time">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: clotting_time_normal, error: !clotting_time_normal}">
                    2-6 min
                  </v-card-text>
                </v-card>
              </v-flex>


              <v-flex xs12 sm6>
                <v-text-field label="Coagulation Time*" suffix="min" readonly v-model="coagulation_time">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: coagulation_time_normal, error: !coagulation_time_normal}">
                    5-5 min
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
    wbc: 0,
    rbc: 0,
    hemoglobin: 0,
    hematocrit: 0,
    segmenters: 0,
    stabs:0,
    lymphocytes: 0,
    monocytes: 0,
    eosinophils: 0,
    basophils: 0,
    others: '',
    platelet_ct:0,
    bleeding_time:0,
    clotting_time:0,
    coagulation_time: 0,
    first_name: '',
    created_at: '',
    wbc_normal: false,
    rbc_normal: false,
    segmenters_normal: false,
    stabs_normal: false,
    lymphocytes_normal: false,
    monocytes_normal: false,
    eosinophils_normal: false,
    basophils_normal: false,
    platelet_ct_normal: false,
    bleeding_time_normal: false,
    clotting_time_normal: false,
    coagulation_time_normal: false
  }),
  methods: {
    getLabResult(){
        this.isLoading = true;

        axios.get('/api/hematologies/'+this.local_unique_id)
        .then((res) => {
          this.isLoading = false;
          this.wbc = res.data.wbc;
          this.rbc = res.data.rbc;
          this.hemoglobin = res.data.hemoglobin;
          this.hematocrit = res.data.hematocrit;
          this.segmenters = res.data.segmenters;
          this.stabs = res.data.stabs;
          this.lymphocytes = res.data.lymphocytes;
          this.monocytes = res.data.monocytes;
          this.eosinophils = res.data.eosinophils;
          this.basophils = res.data.basophils;
          this.others = res.data.others;
          this.platelet_ct = res.data.platelet_ct;
          this.bleeding_time = res.data.bleeding_time;
          this.clotting_time = res.data.clotting_time;
          this.coagulation_time = res.data.coagulation_time;
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
    wbc: function(val) {
      this.wbc_normal = (val >= 4.4 && val <= 11 ? true : false);
    },
    rbc: function(val) {
      this.rbc_normal = (val >= 4.5 && val <= 5.9 ? true : false);
    },
    segmenters: function(val) {
      this.segmenters_normal = (val >= 0.50 && val <= 0.70 ? true : false);
    },
    stabs: function(val) {
      this.stabs_normal = (val >= 0.01 && val <= 0.03 ? true : false);
    },
    lymphocytes: function(val) {
      this.lymphocytes_normal = (val >= 0.20 && val <= 0.40 ? true : false);
    },
    monocytes: function(val) {
      this.monocytes_normal = (val >= 0.03 && val <= 0.09 ? true : false);
    },
    eosinophils: function(val) {
      this.eosinophils_normal = (val >= 0.01 && val <= 0.04 ? true : false);
    },
    basophils: function(val) {
      this.basophils_normal = (val >= 0.00 && val <= 0.01 ? true : false);
    },
    platelet_ct: function(val) {
      this.platelet_ct_normal = (val >= 150 && val <= 450000 ? true : false);
    },
    bleeding_time: function(val) {
      this.bleeding_time_normal = (val >= 1 && val <= 3 ? true : false);
    },
    clotting_time: function(val) {
      this.clotting_time_normal = (val >= 2 && val <= 6 ? true : false);
    },
    coagulation_time: function(val) {
      this.coagulation_time_normal = (val == 5 ? true : false);
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