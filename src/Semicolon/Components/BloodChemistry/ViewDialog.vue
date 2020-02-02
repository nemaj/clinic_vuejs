<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ created_at }} Blood Chemistry of {{ first_name }}
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
                <v-text-field label="FBS" suffix="mg/dl" readonly v-model="fbs"></v-text-field> </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: fbs_normal, error: !fbs_normal}">
                    70-110 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="RBS" suffix="mg/dl" readonly v-model="rbs"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: rbs_normal, error: !rbs_normal}">
                    85-125 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Cholesterol" suffix="mg/dl" readonly v-model="cholesterol"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: cholesterol_normal, error: !cholesterol_normal}">
                    <font-awesome-icon icon="arrow-up" /> 220 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Triglycerides" suffix="mg/dl" readonly v-model="triglycerides"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: triglycerides_normal, error: !triglycerides_normal}">
                    <font-awesome-icon icon="arrow-up" /> 150 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="HDL" suffix="mg/dl" readonly v-model="hdl"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                    M = <font-awesome-icon icon="arrow-up" /> 55 ||
                    F = <font-awesome-icon icon="arrow-up" /> 65 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>              

              <v-flex xs12 sm6>
                <v-text-field label="LDL" suffix="mg/dl" readonly v-model="ldl"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: ldl_normal, error: !ldl_normal}">
                    <font-awesome-icon icon="arrow-up" /> 150 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>              

              <v-flex xs12 sm6>
                <v-text-field label="SGOT" suffix="U/L" readonly v-model="sgot"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                    M = <font-awesome-icon icon="arrow-up" /> 37 || 
                    F = <font-awesome-icon icon="arrow-up" /> 31 U/L
                  </v-card-text>
                </v-card>
              </v-flex>              

              <v-flex xs12 sm6>
                <v-text-field label="Creatinine" suffix="mg/dl" readonly v-model="creatinine"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                      M = <font-awesome-icon icon="arrow-up" /> 0.6-1.1 || 
                      F = <font-awesome-icon icon="arrow-up" /> 0.5-0.9 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="BUN" suffix="mg/dl" readonly v-model="bun"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: bun_normal, error: !bun_normal}">
                    10-50 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>
                            
              <v-flex xs12 sm6>
                <v-text-field label="Uric Acid" suffix="mg/dl" readonly v-model="uric_acid"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                      M = <font-awesome-icon icon="arrow-up" /> 3.4-7.0 || 
                      F = <font-awesome-icon icon="arrow-up" /> 2.4-5.7 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Total Bilirubin" suffix="mg/dl"  readonly v-model="total_bilirubin"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                      <font-awesome-icon icon="arrow-up" /> 1.1 ||
                      Children = <font-awesome-icon icon="arrow-up" /> 1.21 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Direct Bilirubin" suffix="mg/dl" readonly v-model="direct_bilirubin"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                      <font-awesome-icon icon="arrow-up" /> 0.25 ||
                      Children = <font-awesome-icon icon="arrow-up" /> 0.25 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="SGPT" suffix="U/L" readonly v-model="sgpt"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                      M = <font-awesome-icon icon="arrow-up" /> 41 ||
                      F = <font-awesome-icon icon="arrow-up" /> 31 U/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Total Protein" suffix="g/dl" readonly v-model="total_protein"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: total_protein_normal, error: !total_protein_normal}">
                      6.6 - 8.7 g/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Albumin" suffix="g/dl" readonly v-model="albumin"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: albumin_normal, error: !albumin_normal}">
                      3.8 - 5.1 g/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Alkaline Phos" suffix="U/L" readonly v-model="alkaline_phos"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text class="bg-primary text-white">
                      Children = 180-1,200 ||
                      Adult = 100-290 u/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Amylase" suffix="U/L" readonly v-model="amylase"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: amylase_normal, error: !amylase_normal}">
                      <font-awesome-icon icon="arrow-up" /> 55 U/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Potassium" suffix="mmol/L" readonly v-model="potassium"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: potassium_normal, error: !potassium_normal}">
                        3.5 - 5.5 mmol/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Sodium" suffix="mmol/L" readonly v-model="sodium"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: sodium_normal, error: !sodium_normal}">
                      135 - 145 mmol/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Calcium" suffix="mmol/L" readonly v-model="calcium"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: calcium_normal, error: !calcium_normal}">
                        1.05 - 1.30 mmol/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Chloride" suffix="mmol/L" readonly v-model="chloride"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="{success: chloride_normal, error: !chloride_normal}">
                    96 - 110 mmol/L
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
    fbs: 0,
    rbs: 0,
    cholesterol: 0,
    triglycerides: 0,
    hdl: 0,
    ldl:0,
    sgot: 0,
    creatinine:0,
    bun: 0,
    uric_acid: 0,
    total_bilirubin: 0,
    direct_bilirubin:0,
    sgpt:0,
    total_protein:0,
    albumin:0,
    alkaline_phos:0,
    amylase: 0,
    potassium:0,
    sodium:0,
    calcium: 0,
    chloride: 0,
    created_at: '',
    first_name: '',
    fbs_normal: false,
    rbs_normal: false,
    cholesterol_normal: false,
    triglycerides_normal: false,
    ldl_normal: false,
    bun_normal: false,
    total_protein_normal: false,
    albumin_normal: false,
    amylase_normal: false,
    potassium_normal: false,
    sodium_normal: false,
    calcium_normal: false,
    chloride_normal: false
  }),
  methods: {
    getLabResult(){
        this.isLoading = true;

        axios.get('/api/blood_chemistries/'+this.local_unique_id)
        .then((res) => {
            this.isLoading = false;
          
          //if (res.data.length) {
            this.fbs = res.data.fbs;
            this.rbs = res.data.rbs;
            this.cholesterol = res.data.cholesterol;
            this.triglycerides = res.data.triglycerides;
            this.hdl = res.data.hdl;
            this.ldl = res.data.ldl;
            this.sgot = res.data.sgot;
            this.creatinine = res.data.creatinine;
            this.bun = res.data.bun;
            this.uric_acid = res.data.uric_acid;
            this.total_bilirubin = res.data.total_bilirubin;
            this.direct_bilirubin = res.data.direct_bilirubin;
            this.sgpt = res.data.sgpt; 
            this.total_protein = res.data.total_protein;
            this.albumin = res.data.albumin;
            this.alkaline_phos = res.data.alkaline_phos;
            this.amylase = res.data.amylase;
            this.potassium = res.data.potassium;
            this.sodium   = res.data.sodium;
            this.calcium  = res.data.calcium;
            this.chloride = res.data.chloride;
            this.created_at = moment(new Date(res.data.created_at)).format("MMM DD, YYYY");
            this.first_name = res.data.user.first_name;
          //}
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
    fbs: function(val) {
      this.fbs_normal = (val >= 70 && val <= 110 ? true : false);
    },
    rbs: function(val) {
      this.rbs_normal = (val >= 85 && val <= 125 ? true : false);
    },
    cholesterol: function(val){
      this.cholesterol_normal = (val <= 220 ? true : false);
    },
    triglycerides: function(val) {
      this.triglycerides_normal = (val <= 150 ? true : false);
    },
    ldl: function(val) {
      this.ldl_normal = (val <= 150 ? true : false);
    },
    bun: function(val) {
      this.bun_normal = (val >= 10 && val <= 50 ? true : false);
    },
    total_protein: function(val) {
      this.total_protein_normal = (val >= 6.6 && val <= 8.7 ? true : false);
    },
    albumin: function (val) {
      this.albumin_normal = (val >= 3.8 && val <= 5.1 ? true : false);
    },
    amylase: function (val) {
      this.amylase_normal = (val <= 55 ? true : false);
    },
    potassium: function (val) {
      this.potassium_normal = (val >= 3.5 && val <= 5.5 ? true : false);
    },
    sodium: function (val) {
      this.sodium_normal = (val >= 135 && val <= 145 ? true : false);
    },
    calcium: function (val) {
      this.calcium_normal = (val >= 1.05 && val <= 1.30 ? true : false);
    },
    chloride: function(val) {
      this.chloride_normal = (val >= 96 && val <= 110 ? true : false);
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