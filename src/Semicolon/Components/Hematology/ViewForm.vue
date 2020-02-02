<template>
<div class="ficalysis-view-form">

  <v-card  v-if="!isEmptyData">
    <v-card-title v-show="!isLoading">
      <span class="headline">
        <button type="button" class="btn-shadow mr-3 btn btn-primary" title="Print" @click="print">
            <font-awesome-icon icon="print" />
        </button>
        Hematology of {{ first_name }} {{ moment(new Date(created_at), "YYYYMMDD").fromNow() }}
      </span>
      <div>
        <v-select
          :items="results"
          label="Date"
          v-model="selected_id"
          item-text="created_at_text"
          item-value="id"
          @change="getLabResult">
        </v-select>
      </div>
    </v-card-title>

    <v-card-text>
      <div class="text-center" v-show="isLoading">
        <img src="@/assets/images/loading.gif" class="img-fluid" />
      </div>

      <div class="content-value" v-show="!isLoading">
        <div class="content-item split">
          <div class="content-group">
            <label>
              WBC
              <i class="pe-7s-check check-icon text-success" v-show="wbc_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="wbc_normal == 'error'"></i>
              <i class="text-primary" v-show="wbc_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="wbc_normal">
                {{ wbc }} x10<sup>9</sup>/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              RBC 
              <i class="pe-7s-check check-icon text-success" v-show="rbc_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="rbc_normal == 'error'"></i>
              <i class="text-primary" v-show="rbc_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="rbc_normal">
                {{ rbc }} x10<sup>12</sup>/L
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Hemoglobin
              <i class="pe-7s-check check-icon text-success" v-show="hemoglobin_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="hemoglobin_normal == 'error'"></i>
              <i class="text-primary" v-show="hemoglobin_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="hemoglobin_normal">
                {{ hemoglobin }} g/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Hematocrit
              <i class="pe-7s-check check-icon text-success" v-show="hematocrit_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="hematocrit_normal == 'error'"></i>
              <i class="text-primary" v-show="hematocrit_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="hematocrit_normal">
                {{ hematocrit }} /L
              </v-card-text>
            </v-card>
          </div>
        </div>

        <h3 class="subtitle">Different Ct.</h3>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Neutrophils (Segmenters)
              <i class="pe-7s-check check-icon text-success" v-show="segmenters_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="segmenters_normal == 'error'"></i>
              <i class="text-primary" v-show="segmenters_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="segmenters_normal">
                {{ segmenters }}
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Neutrophils (Stabs)
              <i class="pe-7s-check check-icon text-success" v-show="stabs_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="stabs_normal == 'error'"></i>
              <i class="text-primary" v-show="stabs_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="stabs_normal">
                {{ stabs }}
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Lymphocytes
              <i class="pe-7s-check check-icon text-success" v-show="lymphocytes_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="lymphocytes_normal == 'error'"></i>
              <i class="text-primary" v-show="lymphocytes_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="lymphocytes_normal">
                {{ lymphocytes }}
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Monocytes
              <i class="pe-7s-check check-icon text-success" v-show="monocytes_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="monocytes_normal == 'error'"></i>
              <i class="text-primary" v-show="monocytes_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="monocytes_normal">
                {{ monocytes }}
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Eosinophils
              <i class="pe-7s-check check-icon text-success" v-show="eosinophils_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="eosinophils_normal == 'error'"></i>
              <i class="text-primary" v-show="eosinophils_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="eosinophils_normal">
                {{ eosinophils }}
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Basophils
              <i class="pe-7s-check check-icon text-success" v-show="basophils_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="basophils_normal == 'error'"></i>
              <i class="text-primary" v-show="basophils_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="basophils_normal">
                {{ basophils }}
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item">
          <div class="content-group">
            <label>Others</label>
            <p>{{ others }}</p>
          </div>
        </div>

        <h3 class="subtitle">Others</h3>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Platelet Ct.
              <i class="pe-7s-check check-icon text-success" v-show="platelet_ct_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="platelet_ct_normal == 'error'"></i>
              <i class="text-primary" v-show="platelet_ct_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="platelet_ct_normal">
                {{ platelet_ct }} x 10<sup>9</sup>/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Bleeding Time
              <i class="pe-7s-check check-icon text-success" v-show="bleeding_time_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="bleeding_time_normal == 'error'"></i>
              <i class="text-primary" v-show="bleeding_time_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="bleeding_time_normal">
                {{ bleeding_time }} min.
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Clotting Time
              <i class="pe-7s-check check-icon text-success" v-show="clotting_time_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="clotting_time_normal == 'error'"></i>
              <i class="text-primary" v-show="clotting_time_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="clotting_time_normal">
                {{ clotting_time }} min.
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Coagulation Time
              <i class="pe-7s-check check-icon text-success" v-show="coagulation_time_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="coagulation_time_normal == 'error'"></i>
              <i class="text-primary" v-show="coagulation_time_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="coagulation_time_normal">
                {{ coagulation_time }} min.
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
  
  <div v-else><h1 class="text-danger">No Hematology record</h1></div>

  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
</div>
</template>

<script>
if (localStorage.getItem("user")) {
    var loggedUser = JSON.parse(localStorage.getItem("user"));   
} else {
    var loggedUser = {};
}

import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import moment from 'moment';

export default {
  components:{
    ErrorAlert
  },
  props: ['user_id'],
  data: () => ({
    moment: moment,
    isErrorDialog: false,
    isLoading: false,
    errors: [],
    local_user_id: 0,
    selected_id: 0,
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
    others: '',
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
    created_at: '',
    first_name: '',
    sex: '',
    age: 0,
    results: [],
    isEmptyData: false
  }),
  mounted(){
    this.local_user_id = this.user_id;

    this.getUserLabResults();
  },
  methods: {
    setData(data) {
      this.wbc = data.wbc;
      this.rbc = data.rbc;
      this.hemoglobin = data.hemoglobin;
      this.hematocrit = data.hematocrit;
      this.segmenters = data.segmenters;
      this.stabs = data.stabs;
      this.lymphocytes = data.lymphocytes;
      this.monocytes = data.monocytes;
      this.eosinophils = data.eosinophils;
      this.basophils = data.basophils;
      this.others = data.others;
      this.platelet_ct = data.platelet_ct;
      this.bleeding_time = data.bleeding_time;
      this.clotting_time = data.clotting_time;
      this.coagulation_time = data.coagulation_time;
      this.created_at = moment(new Date(data.created_at)).format("MMM DD, YYYY");
      this.first_name = data.user.first_name;
    },
    getUserLabResults() {
      this.isLoading = true;
      
      axios.get('/api/hematologies?filter[user_id]='+this.local_user_id+'&sort=-created_at')
      .then(res => {
        this.isLoading = false;

        this.results = res.data.data;

        if (this.results.length) {
          this.selected_id = res.data.data[0].id;
          this.setData(res.data.data[0]); 
          this.checkSeen();
        } else {
          this.isEmptyData = true;
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
    getLabResult(){
      this.isLoading = true;

      axios.get('/api/hematologies/'+this.selected_id)
      .then((res) => {
          this.isLoading = false;

          this.setData(res.data);
          this.checkSeen();
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
    checkSeen(){
      this.isLoading = true;

      var params = "filter[user_id]="+loggedUser.id+
             "&filter[seenable_type]=App\\Hematology"+
             "&filter[seenable_id]="+this.selected_id;

      axios.get('api/seens?'+params)
      .then((res) => {
        console.log("total Hematology is...."+res.data.meta.total);
        this.isLoading = false;
          
        if (!res.data.meta.total) {
          this.seen();
        }
      })
      .catch((error) => {
          //this.isErrorDialog = true;
          this.isLoading = false;
          /*this.errors = [];
          this.errors.push(error);

          if (error.response.data.errors !== undefined) {          
            Object.entries(error.response.data.errors).forEach(
                ([key, value]) => this.errors.push(value.toString())
            );
          }*/
      });
    },
    seen(){
      this.isLoading = true;

      axios.post('api/seens', {
        'user_id': loggedUser.id,
        'seenable_id': this.selected_id,
        'seenable_type': 'App\\Hematology',
        'seenable_user_id': this.local_user_id
      })
      .then((res) => {
          this.isLoading = false;
          this.$emit('seen', true);
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
      window.open(localStorage.getItem("apiURL")+"/print/hematology?id="+this.selected_id); 
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

<style lang="scss" scoped>
  .ficalysis-view-form {
    .v-card__title {
      display: flex;
      > span {
        flex-grow: 1;
      }
    }
  }

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