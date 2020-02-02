data<template>
<div class="ficalysis-view-form">
  <v-card v-if="!isEmptyData">
    <v-card-title v-show="!isLoading">
      <span class="headline">
        <button type="button" class="btn-shadow mr-3 btn btn-primary" title="Print" @click="print">
            <font-awesome-icon icon="print" />
        </button>
        Special Test of {{ first_name }} {{ moment(new Date(created_at), "YYYYMMDD").fromNow() }}
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
              Hb41C
              <i class="pe-7s-check check-icon text-success" v-show="hba1c_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="hba1c_normal == 'error'"></i>
              <i class="text-primary" v-show="hba1c_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="hba1c_normal">
                {{ hba1c }} %
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              PSA 
              <i class="pe-7s-check check-icon text-success" v-show="psa_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="psa_normal == 'error'"></i>
              <i class="text-primary" v-show="psa_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="psa_normal">
                {{ psa }} ng/mL
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              TROP-I
              <i class="pe-7s-check check-icon text-success" v-show="trop_i_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="trop_i_normal == 'error'"></i>
              <i class="text-primary" v-show="trop_i_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="trop_i_normal">
                {{ trop_i }} ng/mL
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              TSH
              <i class="pe-7s-check check-icon text-success" v-show="tsh_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="tsh_normal == 'error'"></i>
              <i class="text-primary" v-show="tsh_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="tsh_normal">
                {{ tsh }} mlU/L
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              T4
              <i class="pe-7s-check check-icon text-success" v-show="t4_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="t4_normal == 'error'"></i>
              <i class="text-primary" v-show="t4_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="t4_normal">
                {{ t4 }} nmoL/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              T3
              <i class="pe-7s-check check-icon text-success" v-show="t3_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="t3_normal == 'error'"></i>
              <i class="text-primary" v-show="t3_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="t3_normal">
                {{ t3 }} nmoL/L
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <div v-else><h1 class="text-danger">No Special test result record</h1></div>

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
    created_at: '',
    first_name: '',
    results: [],
    isEmptyData: false,
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
    
  }),
  mounted(){
    this.local_user_id = this.user_id;

    this.getUserLabResults();
  },
  methods: {
    setData(data) {
      this.hba1c = data.hba1c;
      this.psa = data.psa;
      this.trop_i = data.trop_i;
      this.tsh = data.tsh;
      this.t4 = data.t4;
      this.t3 = data.t3;
      this.created_at = moment(new Date(data.created_at)).format("MMM DD, YYYY");
      this.first_name = data.user.first_name;
    },
    getUserLabResults() {
      axios.get('/api/special_test_lab_results?filter[user_id]='+this.local_user_id+'&sort=-created_at')
      .then(res => {
        this.isLoading = false;
        this.isEmptyData = false;

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

      axios.get('/api/special_test_lab_results/'+this.selected_id)
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
             "&filter[seenable_type]=App\\SpecialTestLabResult"+
             "&filter[seenable_id]="+this.selected_id;

      axios.get('api/seens?'+params)
      .then((res) => {
        console.log("total special-test is...."+res.data.meta.total);
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
        'seenable_type': 'App\\SpecialTestLabResult',
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
      window.open(localStorage.getItem("apiURL")+"/print/special-test?id="+this.selected_id); 
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