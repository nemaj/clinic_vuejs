<template>
  <v-layout row justify-center>
    <!-- <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable> -->
      <v-card>
        <v-card-title>
          <span class="headline">
            <font-awesome-icon icon="female" style="color:pink;" v-if="sex == 'F'" title="Female" />
            <font-awesome-icon icon="male" style="color:blue;" v-else title="Male" />
            {{ isInsert ? 'Add' : 'Edit' }} Today's Hematology of {{ first_name }}
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
                <v-text-field label="WBC"  v-model="wbc"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="wbc_normal">
                    4.4 - 11.0 x10<sup>9</sup>/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="RBC"  v-model="rbc"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="rbc_normal">
                    4.5 - 5.9 x10<sup>12</sup>/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Hemoglobin" suffix="g/L"  v-model="hemoglobin">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="hemoglobin_normal">
                    M= 14.0 - 17.5 || F = 12.0 - 15.0 g/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Hematocrit" suffix="/L"  v-model="hematocrit">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="hematocrit_normal">
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
                <v-text-field label="Neutrophils (Segmenters)"  v-model="segmenters">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="segmenters_normal">
                    0.50 - 0.70
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Neutrophils (Stabs)"  v-model="stabs"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="stabs_normal">
                    0.01 - 0.03
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Lymphocytes"  v-model="lymphocytes"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="lymphocytes_normal">
                    0.20 - 0.40
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Monocytes"  v-model="monocytes"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="monocytes_normal">
                    0.03 - 0.09
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Eosinophils"  v-model="eosinophils"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="eosinophils_normal">
                    0.01 - 0.04
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Basophils"  v-model="basophils"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="basophils_normal">
                    0.00 - 0.01
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-textarea label="Others" v-model="others" ></v-textarea>
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
                <v-text-field label="Platelet Ct."  v-model="platelet_ct"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="platelet_ct_normal">
                    150-450 x 10<sup>9</sup>/L
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Bleeding Time" suffix="min"  v-model="bleeding_time">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="bleeding_time_normal">
                    1-3 min
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Clotting Time" suffix="min"  v-model="clotting_time">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="clotting_time_normal">
                    2-6 min
                  </v-card-text>
                </v-card>
              </v-flex>


              <v-flex xs12 sm6>
                <v-text-field label="Coagulation Time" suffix="min"  v-model="coagulation_time">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-card class="mx-auto text-center">
                  <v-card-text :class="coagulation_time_normal">
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
    wbc: '',
    rbc: '',
    hemoglobin: '',
    hematocrit: '',
    segmenters: '',
    stabs: '',
    lymphocytes: '',
    monocytes: '',
    eosinophils: '',
    basophils: '',
    others: 'No comment',
    platelet_ct: '',
    bleeding_time: '',
    clotting_time: '',
    coagulation_time: '',
    wbc_normal: 'blank',
    rbc_normal: 'blank',
    hemoglobin_normal: 'blank',
    hematocrit_normal: 'blank',
    segmenters_normal: 'blank',
    stabs_normal: 'blank',
    lymphocytes_normal: 'blank',
    monocytes_normal: 'blank',
    eosinophils_normal: 'blank',
    basophils_normal: 'blank',
    platelet_ct_normal: 'blank',
    bleeding_time_normal: 'blank',
    clotting_time_normal: 'blank',
    coagulation_time_normal: 'blank',
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

      axios.put('/api/hematologies/'+this.unique_id,{
        user_id: this.local_user_id,
        wbc: this.wbc,
        rbc: this.rbc,
        hemoglobin: this.hemoglobin,
        hematocrit: this.hematocrit,
        segmenters: this.segmenters,
        stabs: this.stabs,
        lymphocytes: this.lymphocytes,
        monocytes: this.monocytes,
        eosinophils: this.eosinophils,
        basophils: this.basophils,
        others: this.others,
        platelet_ct: this.platelet_ct,
        bleeding_time: this.bleeding_time,
        clotting_time: this.clotting_time,
        coagulation_time: this.coagulation_time
      })
      .then((res) => {
        this.isLoading = false;
        // this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Hematoloy updated successfully";
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

      axios.post('/api/hematologies',{
        user_id: this.local_user_id,
        wbc: this.wbc,
        rbc: this.rbc,
        hemoglobin: this.hemoglobin,
        hematocrit: this.hematocrit,
        segmenters: this.segmenters,
        stabs: this.stabs,
        lymphocytes: this.lymphocytes,
        monocytes: this.monocytes,
        eosinophils: this.eosinophils,
        basophils: this.basophils,
        others: this.others,
        platelet_ct: this.platelet_ct,
        bleeding_time: this.bleeding_time,
        clotting_time: this.clotting_time,
        coagulation_time: this.coagulation_time
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Hematology inserted successfully";
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

        axios.get('/api/hematologies?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
          this.isLoading = false;
          this.inserted = false;

          if (res.data.data.length) {
            this.isInsert = false;
            this.unique_id = res.data.data[0].id;
            this.wbc = res.data.data[0].wbc;
            this.rbc = res.data.data[0].rbc;
            this.hemoglobin = res.data.data[0].hemoglobin;
            this.hematocrit = res.data.data[0].hematocrit;
            this.segmenters = res.data.data[0].segmenters;
            this.stabs = res.data.data[0].stabs;
            this.lymphocytes = res.data.data[0].lymphocytes;
            this.monocytes = res.data.data[0].monocytes;
            this.eosinophils = res.data.data[0].eosinophils;
            this.basophils = res.data.data[0].basophils;
            this.others = res.data.data[0].others;
            this.platelet_ct = res.data.data[0].platelet_ct;
            this.bleeding_time = res.data.data[0].bleeding_time;
            this.clotting_time = res.data.data[0].clotting_time;
            this.coagulation_time = res.data.data[0].coagulation_time;
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
      window.open(localStorage.getItem("apiURL")+"/print/hematology?id="+this.unique_id); 
    }
  },
  watch: {
    /*user_id: function(val){
      console.log("value is: "+val);
      this.local_user_id = this.user_id;
      this.getLabResultToday();
    },*/
    wbc: function(val) {
      this.wbc_normal = (val >= 4.4 && val <= 11 ? 'success' : (val ? 'error' : 'blank'));
    },
    rbc: function(val) {
      this.rbc_normal = (val >= 4.5 && val <= 5.9 ? 'success' : (val ? 'error' : 'blank'));
    },
    hemoglobin(val) {
      if (this.sex == 'M') {
        this.hemoglobin_normal = (val >= 14 && val <= 17.5 ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.hemoglobin_normal = (val >= 12 && val <= 15 ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    hematocrit(val) {
      if (this.sex == 'M') {
        this.hematocrit_normal = (val >= 41 && val <= 50 ? 'success' : (val ? 'error' : 'blank'));
      } else {
        this.hematocrit_normal = (val >= 36 && val <= 45 ? 'success' : (val ? 'error' : 'blank'));
      }
    },
    segmenters: function(val) {
      this.segmenters_normal = (val >= 0.50 && val <= 0.70 ? 'success' : (val ? 'error' : 'blank'));
    },
    stabs: function(val) {
      this.stabs_normal = (val >= 0.01 && val <= 0.03 ? 'success' : (val ? 'error' : 'blank'));
    },
    lymphocytes: function(val) {
      this.lymphocytes_normal = (val >= 0.20 && val <= 0.40 ? 'success' : (val ? 'error' : 'blank'));
    },
    monocytes: function(val) {
      this.monocytes_normal = (val >= 0.03 && val <= 0.09 ? 'success' : (val ? 'error' : 'blank'));
    },
    eosinophils: function(val) {
      this.eosinophils_normal = (val >= 0.01 && val <= 0.04 ? 'success' : (val ? 'error' : 'blank'));
    },
    basophils: function(val) {
      this.basophils_normal = (val >= 0.00 && val <= 0.01 && val ? 'success' : (val ? 'error' : 'blank'));
    },
    platelet_ct: function(val) {
      this.platelet_ct_normal = (val >= 150 && val <= 450000 ? 'success' : (val ? 'error' : 'blank'));
    },
    bleeding_time: function(val) {
      this.bleeding_time_normal = (val >= 1 && val <= 3 ? 'success' : (val ? 'error' : 'blank'));
    },
    clotting_time: function(val) {
      this.clotting_time_normal = (val >= 2 && val <= 6 ? 'success' : (val ? 'error' : 'blank'));
    },
    coagulation_time: function(val) {
      this.coagulation_time_normal = (val == 5 && val ? 'success' : (val ? 'error' : 'blank'));
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