<template>
  <v-layout row justify-center>
    <!-- <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable> -->
      <v-card>
        <v-card-title>
          <span class="headline">
            <font-awesome-icon icon="female" style="color:pink;" v-if="sex == 'F'" title="Female" />
            <font-awesome-icon icon="male" style="color:blue;" v-else title="Male" />
            {{ isInsert ? 'Add' : 'Edit' }} Today's Blood Chemistry of {{ first_name }}
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
                <v-text-field label="FBS" suffix="mg/dl"  v-model="fbs"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="fbs_normal">
                    70-110 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="RBS" suffix="mg/dl"  v-model="rbs"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="rbs_normal">
                    85-125 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Cholesterol" suffix="mg/dl"  v-model="cholesterol"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="cholesterol_normal">
                    <font-awesome-icon icon="arrow-up" /> 220 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Triglycerides" suffix="mg/dl"  v-model="triglycerides"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="triglycerides_normal">
                    <font-awesome-icon icon="arrow-up" /> 150 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="HDL" suffix="mg/dl"  v-model="hdl"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="hdl_normal">
                    M = <font-awesome-icon icon="arrow-up" /> 55 ||
                    F = <font-awesome-icon icon="arrow-up" /> 65 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="LDL" suffix="mg/dl"  v-model="ldl"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="ldl_normal">
                    <font-awesome-icon icon="arrow-up" /> 150 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="SGOT" suffix="U/L"  v-model="sgot"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="sgot_normal">
                    M = <font-awesome-icon icon="arrow-up" /> 37 ||
                    F = <font-awesome-icon icon="arrow-up" /> 31 U/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Creatinine" suffix="mg/dl"  v-model="creatinine"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="creatinine_normal">
                      M = 0.6-1.1 ||
                      F = 0.5-0.9 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="BUN" suffix="mg/dl"  v-model="bun"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="bun_normal">
                    10-50 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Uric Acid" suffix="mg/dl"  v-model="uric_acid"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text  :class="uric_acid_normal">
                      M = 3.4-7.0 ||
                      F = 2.4-5.7 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Total Bilirubin" suffix="mg/dl" v-model="total_bilirubin"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="total_bilirubin_normal">
                      <font-awesome-icon icon="arrow-up" /> 1.1 ||
                      Children = <font-awesome-icon icon="arrow-up" /> 1.21 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Direct Bilirubin" suffix="mg/dl"  v-model="direct_bilirubin"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text  :class="direct_bilirubin_normal">
                      <font-awesome-icon icon="arrow-up" /> 0.25 ||
                      Children = <font-awesome-icon icon="arrow-up" /> 0.25 mg/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="SGPT" suffix="U/L"  v-model="sgpt"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="sgpt_normal">
                      M = <font-awesome-icon icon="arrow-up" /> 41 ||
                      F = <font-awesome-icon icon="arrow-up" /> 31 U/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Total Protein" suffix="g/dl"  v-model="total_protein"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="total_protein_normal">
                      6.6 - 8.7 g/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Albumin" suffix="g/dl"  v-model="albumin"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="albumin_normal">
                      3.8 - 5.1 g/dl
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Alkaline Phos" suffix="U/L"  v-model="alkaline_phos"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="alkaline_phos_normal">
                      Children = 180-1,200 ||
                      Adult = 100-290 u/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Amylase" suffix="U/L"  v-model="amylase"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="amylase_normal">
                      <font-awesome-icon icon="arrow-up" /> 55 U/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Potassium" suffix="mmol/L"  v-model="potassium"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="potassium_normal">
                        3.5 - 5.5 mmol/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Sodium" suffix="mmol/L"  v-model="sodium"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="sodium_normal">
                      135 - 145 mmol/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Calcium" suffix="mmol/L"  v-model="calcium"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="calcium_normal">
                        1.05 - 1.30 mmol/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Chloride" suffix="mmol/L"  v-model="chloride"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="chloride_normal">
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
    fbs: '',
    rbs: '',
    cholesterol: '',
    triglycerides: '',
    hdl: '',
    ldl: '',
    sgot: '',
    creatinine: '',
    bun: '',
    uric_acid: '',
    total_bilirubin: '',
    direct_bilirubin: '',
    sgpt: '',
    total_protein: '',
    albumin: '',
    alkaline_phos: '',
    amylase: '',
    potassium: '',
    sodium: '',
    calcium: '',
    chloride: '',
    fbs_normal: 'blank',
    rbs_normal: 'blank',
    cholesterol_normal: 'blank',
    triglycerides_normal: 'blank',
    hdl_normal: 'blank',
    ldl_normal: 'blank',
    sgot_normal: 'blank',
    creatinine_normal: 'blank',
    uric_acid_normal: 'blank',
    total_bilirubin_normal: 'blank',
    direct_bilirubin_normal: 'blank',
    sgpt_normal: 'blank', 
    bun_normal: 'blank',
    total_protein_normal: 'blank',
    albumin_normal: 'blank',
    alkaline_phos_normal: 'blank',
    amylase_normal: 'blank',
    potassium_normal: 'blank',
    sodium_normal: 'blank',
    calcium_normal: 'blank',
    chloride_normal: 'blank',
    rules: {required: value => !!value || 'Required.'},
    sex: '',
    age: 0,
    first_name: ''
  }),
  mounted(){
    this.local_user_id = this.user_id;
    this.getLabResultToday();
    this.getUser();
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

      axios.put('/api/blood_chemistries/'+this.unique_id,{
        user_id: this.local_user_id,
        fbs: this.fbs,
        rbs: this.rbs,
        cholesterol: this.cholesterol,
        triglycerides: this.triglycerides,
        hdl: this.hdl,
        ldl: this.ldl,
        sgot: this.sgot,
        creatinine: this.creatinine,
        bun: this.bun,
        uric_acid: this.uric_acid,
        total_bilirubin: this.total_bilirubin,
        direct_bilirubin: this.direct_bilirubin,
        sgpt: this.sgpt,
        total_protein: this.total_protein,
        albumin: this.albumin,
        alkaline_phos: this.alkaline_phos,
        amylase: this.amylase,
        potassium: this.potassium,
        sodium: this.sodium,
        calcium: this.calcium,
        chloride: this.chloride
      })
      .then((res) => {
        this.isLoading = false;
        // this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Blood Chemistry updated successfully";
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

      axios.post('/api/blood_chemistries',{
        user_id: this.local_user_id,
        fbs: this.fbs,
        rbs: this.rbs,
        cholesterol: this.cholesterol,
        triglycerides: this.triglycerides,
        hdl: this.hdl,
        ldl: this.ldl,
        sgot: this.sgot,
        creatinine: this.creatinine,
        bun: this.bun,
        uric_acid: this.uric_acid,
        total_bilirubin: this.total_bilirubin,
        direct_bilirubin: this.direct_bilirubin,
        sgpt: this.sgpt,
        total_protein: this.total_protein,
        albumin: this.albumin,
        alkaline_phos: this.alkaline_phos,
        amylase: this.amylase,
        potassium: this.potassium,
        sodium: this.sodium,
        calcium: this.calcium,
        chloride: this.chloride
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Blood Chemistry inserted successfully";
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

        axios.get('/api/blood_chemistries?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
          this.isLoading = false;
          this.inserted = false;

          if (res.data.data.length) {
            this.isInsert = false;
            this.unique_id = res.data.data[0].id;
            this.fbs = res.data.data[0].fbs;
            this.rbs = res.data.data[0].rbs;
            this.cholesterol = res.data.data[0].cholesterol;
            this.triglycerides = res.data.data[0].triglycerides;
            this.hdl = res.data.data[0].hdl;
            this.ldl = res.data.data[0].ldl;
            this.sgot = res.data.data[0].sgot;
            this.creatinine = res.data.data[0].creatinine;
            this.bun = res.data.data[0].bun;
            this.uric_acid = res.data.data[0].uric_acid;
            this.total_bilirubin = res.data.data[0].total_bilirubin;
            this.direct_bilirubin = res.data.data[0].direct_bilirubin;
            this.sgpt = res.data.data[0].sgpt;
            this.total_protein = res.data.data[0].total_protein;
            this.albumin = res.data.data[0].albumin;
            this.alkaline_phos = res.data.data[0].alkaline_phos;
            this.amylase = res.data.data[0].amylase;
            this.potassium = res.data.data[0].potassium;
            this.sodium   = res.data.data[0].sodium;
            this.calcium  = res.data.data[0].calcium;
            this.chloride = res.data.data[0].chloride;
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
    getUser(){
      axios.get('/api/users/'+this.local_user_id)
        .then((res) => {
          this.sex = res.data.sex;
          this.age = res.data.age;
          this.first_name = res.data.first_name;
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
      window.open(localStorage.getItem("apiURL")+"/print/blood-chemistry?id="+this.unique_id); 
    }
  },
  watch: {
    /*user_id: function(val){
      console.log("value is: "+val);
      this.local_user_id = this.user_id;
      this.getLabResultToday();
    },*/
    fbs: function(val) {
      this.fbs_normal = (val >= 70 && val <= 110 ? 'success' : (val ? 'error' : 'blank'));
    },
    rbs: function(val) {
      this.rbs_normal = (val >= 85 && val <= 125 ? 'success' : (val ? 'error' : 'blank'));
    },
    cholesterol: function(val){
      this.cholesterol_normal = (val <= 220 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    triglycerides: function(val) {
      this.triglycerides_normal = (val <= 150 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    hdl(val){
      if (this.sex == 'M') {
        this.hdl_normal = (val <= 55 && val ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.hdl_normal = (val <= 65 && val ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    ldl: function(val) {
      this.ldl_normal = (val <= 150 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    sgot(val){
      if (this.sex == 'M') {
        this.sgot_normal = (val <= 37 && val ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.sgot_normal = (val <= 31 && val ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    creatinine(val){
      if (this.sex == 'M') {
        this.creatinine_normal = (val >= 0.6 && val <= 1.1 ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.creatinine_normal = (val >= 0.5 && val <= 0.9 ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    bun: function(val) {
      this.bun_normal = (val >= 10 && val <= 50 ? 'success' : (val ? 'error' : 'blank'));
    },
    uric_acid(val) {
      if (this.sex == 'M') {
        this.uric_acid_normal = (val >= 3.4 && val <= 7 ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.uric_acid_normal = (val >= 2.4 && val <= 5.7 ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    total_bilirubin(val){
      if (this.age > 12) {
        this.total_bilirubin_normal = (val <= 1.1 && val ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.total_bilirubin_normal = (val <= 1.21 && val ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    direct_bilirubin(val){
      this.direct_bilirubin_normal = (val <= 0.25 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    sgpt(val){
      if (this.sex == 'M') {
        this.sgpt_normal = (val <= 41 && val ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.sgpt_normal = (val <= 31 && val ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    total_protein: function(val) {
      this.total_protein_normal = (val >= 6.6 && val <= 8.7 ? 'success' : (val ? 'error' : 'blank'));
    },
    albumin: function (val) {
      this.albumin_normal = (val >= 3.8 && val <= 5.1 ? 'success' : (val ? 'error' : 'blank'));
    },
    alkaline_phos(val){
      if (this.age > 12) {
        this.alkaline_phos_normal = (val >= 100 && val <= 290 ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.alkaline_phos_normal = (val >= 180 && val <= 1200 ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    amylase: function (val) {
      this.amylase_normal = (val <= 55 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    potassium: function (val) {
      this.potassium_normal = (val >= 3.5 && val <= 5.5 ? 'success' : (val ? 'error' : 'blank'));
    },
    sodium: function (val) {
      this.sodium_normal = (val >= 135 && val <= 145 ? 'success' : (val ? 'error' : 'blank'));
    },
    calcium: function (val) {
      this.calcium_normal = (val >= 1.05 && val <= 1.30 ? 'success' : (val ? 'error' : 'blank'));
    },
    chloride: function(val) {
      this.chloride_normal = (val >= 96 && val <= 110 ? 'success' : (val ? 'error' : 'blank'));
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
