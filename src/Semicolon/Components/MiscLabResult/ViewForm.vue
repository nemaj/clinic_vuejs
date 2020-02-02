<template>
<div class="ficalysis-view-form">
  <v-card v-if="!isEmptyData">
    <v-card-title v-show="!isLoading">
      <span class="headline">
        <button type="button" class="btn-shadow mr-3 btn btn-primary" title="Print" @click="print">
            <font-awesome-icon icon="print" />
        </button>
        Miscellaneous Results of {{ first_name }} {{ moment(new Date(created_at), "YYYYMMDD").fromNow() }}
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
        <h3 class="subtitle text-left">Dengue Duo Test</h3>
        <div class="content-item">
          <div class="content-group">
            <label>Specimen</label>
            <p>{{ labResults.dengue_duo_test }}</p>
          </div>
        </div>
        <div class="content-item">
          <div class="content-group">
            <label>Results/Interpretation</label>
            <p>{{ labResults.dengue_duo_test_result }}</p>
          </div>
        </div>
        <div class="content-separator"></div>

        <h3 class="subtitle text-left mt-4">Pregnancy Test</h3>
        <div class="content-item">
          <div class="content-group">
            <label>Specimen</label>
            <p>{{ labResults.pregnancy_test }}</p>
          </div>
        </div>
        <div class="content-item">
          <div class="content-group">
            <label>Results/Interpretation</label>
            <p>{{ labResults.pregnancy_test_result }}</p>
          </div>
        </div>
        <div class="content-separator"></div>

        <h3 class="subtitle text-left mt-4">VDRL</h3>
        <div class="content-item">
          <div class="content-group">
            <label>Specimen</label>
            <p>{{ labResults.vdrl }}</p>
          </div>
        </div>
        <div class="content-item">
          <div class="content-group">
            <label>Results/Interpretation</label>
            <p>{{ labResults.vdrl_result }}</p>
          </div>
        </div>
        <div class="content-separator"></div>

        <h3 class="subtitle text-left mt-4">HBsAg</h3>
        <div class="content-item">
          <div class="content-group">
            <label>Specimen</label>
            <p>{{ labResults.hbsag }}</p>
          </div>
        </div>
        <div class="content-item">
          <div class="content-group">
            <label>Results/Interpretation</label>
            <p>{{ labResults.hbsag_result }}</p>
          </div>
        </div>
        <div class="content-separator"></div>

        <h3 class="subtitle text-left mt-4">HAV</h3>
        <div class="content-item">
          <div class="content-group">
            <label>Specimen</label>
            <p>{{ labResults.hav }}</p>
          </div>
        </div>
        <div class="content-item">
          <div class="content-group">
            <label>Results/Interpretation</label>
            <p>{{ labResults.hav_result }}</p>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <div v-else><h1 class="text-danger">No Miscellanous test result record</h1></div>

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
    labResults: {},
    created_at: '',
    first_name: '',
    results: [],
    isEmptyData: false
  }),
  mounted(){
    this.local_user_id = this.user_id;

    this.getUserLabResults();
  },
  methods: {
    setData(data) {
      this.labResults = data;
      this.created_at = moment(new Date(data.created_at)).format("MMM DD, YYYY");
      this.first_name = data.user.first_name;
    },
    getUserLabResults() {
      this.isLoading = true;
      
      axios.get('/api/misc_lab_results?filter[user_id]='+this.local_user_id+'&sort=-created_at')
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

      axios.get('/api/misc_lab_results/'+this.selected_id)
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
             "&filter[seenable_type]=App\\MiscLabResult"+
             "&filter[seenable_id]="+this.selected_id;

      axios.get('api/seens?'+params)
      .then((res) => {
        console.log("total miscellaneous is...."+res.data.meta.total);
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
        'seenable_type': 'App\\MiscLabResult',
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
      window.open(localStorage.getItem("apiURL")+"/print/miscellaneous?id="+this.selected_id); 
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
</style>