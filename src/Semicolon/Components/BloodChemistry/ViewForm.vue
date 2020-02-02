data<template>
<div class="ficalysis-view-form">
  <v-card v-if="!isEmptyData">
    <v-card-title v-show="!isLoading">
      <span class="headline">
        <button type="button" class="btn-shadow mr-3 btn btn-primary" title="Print" @click="print">
            <font-awesome-icon icon="print" />
        </button>
        Blood Chemistry of {{ first_name }} {{ moment(new Date(created_at), "YYYYMMDD").fromNow() }}
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
              FBS 
              <i class="pe-7s-check check-icon text-success" v-show="fbs_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="fbs_normal == 'error'"></i>
              <i class="text-primary" v-show="fbs_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="fbs_normal">
                {{ fbs }} mg/dl
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              RBS
              <i class="pe-7s-check check-icon text-success" v-show="rbs_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="rbs_normal == 'error'"></i>
              <i class="text-primary" v-show="rbs_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="rbs_normal">
                {{ rbs }} mg/dl
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Cholesterol
              <i class="pe-7s-check check-icon text-success" v-show="cholesterol_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="cholesterol_normal == 'error'"></i>
              <i class="text-primary" v-show="cholesterol_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="cholesterol_normal">
                {{ cholesterol }} mg/dl
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Triglycerides
              <i class="pe-7s-check check-icon text-success" v-show="triglycerides_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="triglycerides_normal == 'error'"></i>
              <i class="text-primary" v-show="triglycerides_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="triglycerides_normal">
                {{ triglycerides }} mg/dl
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              HDL
              <i class="pe-7s-check check-icon text-success" v-show="hdl_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="hdl_normal == 'error'"></i>
              <i class="text-primary" v-show="hdl_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="hdl_normal">
                {{ hdl }} mg/dl
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              LDL
              <i class="pe-7s-check check-icon text-success" v-show="ldl_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="ldl_normal == 'error'"></i>
              <i class="text-primary" v-show="ldl_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="ldl_normal">
                {{ ldl }} mg/dl
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              SGOT 
              <i class="pe-7s-check check-icon text-success" v-show="sgot_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="sgot_normal == 'error'"></i>
              <i class="text-primary" v-show="sgot_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="sgot_normal">
                {{ sgot }} U/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Creatinine
              <i class="pe-7s-check check-icon text-success" v-show="creatinine_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="creatinine_normal == 'error'"></i>
              <i class="text-primary" v-show="creatinine_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="creatinine_normal">
                {{ creatinine }} mg/dl
              </v-card-text>
            </v-card>            
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              BUN
              <i class="pe-7s-check check-icon text-success" v-show="bun_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="bun_normal == 'error'"></i>
              <i class="text-primary" v-show="bun_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="bun_normal">
                {{ bun }} mg/dl
              </v-card-text>
            </v-card>        
          </div>
          <div class="content-group">
            <label>
              Uric Acid
              <i class="pe-7s-check check-icon text-success" v-show="uric_acid_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="uric_acid_normal == 'error'"></i>
              <i class="text-primary" v-show="uric_acid_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="uric_acid_normal">
                {{ uric_acid }} mg/dl
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Direct Bilirubin
              <i class="pe-7s-check check-icon text-success" v-show="direct_bilirubin_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="direct_bilirubin_normal == 'error'"></i>
              <i class="text-primary" v-show="direct_bilirubin_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="direct_bilirubin_normal">
                {{ direct_bilirubin }} mg/dl
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              SGPT
              <i class="pe-7s-check check-icon text-success" v-show="sgpt_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="sgpt_normal == 'error'"></i>
              <i class="text-primary" v-show="sgpt_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="sgpt_normal">
                {{ sgpt }} U/L
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Total Protein
              <i class="pe-7s-check check-icon text-success" v-show="total_protein_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="total_protein_normal == 'error'"></i>
              <i class="text-primary" v-show="total_protein_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="total_protein_normal">
                {{ total_protein }} g/dl
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Albumin
              <i class="pe-7s-check check-icon text-success" v-show="albumin_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="albumin_normal == 'error'"></i>
              <i class="text-primary" v-show="albumin_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="albumin_normal">
                {{ albumin }} g/dl
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Alkaline Phos
              <i class="pe-7s-check check-icon text-success" v-show="alkaline_phos_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="alkaline_phos_normal == 'error'"></i>
              <i class="text-primary" v-show="alkaline_phos_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="alkaline_phos_normal">
                {{ alkaline_phos }} u/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Amylase
              <i class="pe-7s-check check-icon text-success" v-show="amylase_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="amylase_normal == 'error'"></i>
              <i class="text-primary" v-show="amylase_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="amylase_normal">
                {{ amylase }} U/L
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Potassium
              <i class="pe-7s-check check-icon text-success" v-show="potassium_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="potassium_normal == 'error'"></i>
              <i class="text-primary" v-show="potassium_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="potassium_normal">
                {{ potassium }} mmol/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Sodium
              <i class="pe-7s-check check-icon text-success" v-show="sodium_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="sodium_normal == 'error'"></i>
              <i class="text-primary" v-show="sodium_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="sodium_normal">
                {{ sodium }} mmol/L
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>
              Calcium
              <i class="pe-7s-check check-icon text-success" v-show="calcium_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="calcium_normal == 'error'"></i>
              <i class="text-primary" v-show="calcium_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="calcium_normal">
                {{ calcium }} mmol/L
              </v-card-text>
            </v-card>
          </div>
          <div class="content-group">
            <label>
              Chloride
              <i class="pe-7s-check check-icon text-success" v-show="chloride_normal == 'success'"></i>
              <i class="pe-7s-attention attention-icon" v-show="chloride_normal == 'error'"></i>
              <i class="text-primary" v-show="chloride_normal == 'blank'">---</i>
            </label>
            <v-card class="mx-auto text-center">
              <v-card-text :class="chloride_normal">
                {{ chloride }} mmol/L
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <div v-else><h1 class="text-danger">No Blood Chemistry record</h1></div>

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
      this.fbs = data.fbs;
      this.rbs = data.rbs;
      this.cholesterol = data.cholesterol;
      this.triglycerides = data.triglycerides;
      this.hdl = data.hdl;
      this.ldl = data.ldl;
      this.sgot = data.sgot;
      this.creatinine = data.creatinine;
      this.bun = data.bun;
      this.uric_acid = data.uric_acid;
      this.total_bilirubin = data.total_bilirubin;
      this.direct_bilirubin = data.direct_bilirubin;
      this.sgpt = data.sgpt;
      this.total_protein = data.total_protein;
      this.albumin = data.albumin;
      this.alkaline_phos = data.alkaline_phos;
      this.amylase = data.amylase;
      this.potassium = data.potassium;
      this.sodium   = data.sodium;
      this.calcium  = data.calcium;
      this.chloride = data.chloride;
      this.created_at = moment(new Date(data.created_at)).format("MMM DD, YYYY");
      this.first_name = data.user.first_name;
      this.sex = data.user.sex;
      this.age = data.user.age;
    },
    getUserLabResults() {
      this.isLoading = true;
      
      axios.get('/api/blood_chemistries?filter[user_id]='+this.local_user_id+'&sort=-created_at')
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

      axios.get('/api/blood_chemistries/'+this.selected_id)
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
             "&filter[seenable_type]=App\\BloodChemistry"+
             "&filter[seenable_id]="+this.selected_id;

      axios.get('api/seens?'+params)
      .then((res) => {
        console.log("total blood-chemistry is...."+res.data.meta.total);
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
        'seenable_type': 'App\\BloodChemistry',
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
      window.open(localStorage.getItem("apiURL")+"/print/blood-chemistry?id="+this.selected_id); 
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