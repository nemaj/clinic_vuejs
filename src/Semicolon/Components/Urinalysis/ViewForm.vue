data<template>
<div class="ficalysis-view-form">
  <v-card v-if="!isEmptyData">
    <v-card-title v-show="!isLoading">
      <span class="headline">
        <button type="button" class="btn-shadow mr-3 btn btn-primary" title="Print" @click="print">
          <font-awesome-icon icon="print" />
        </button>
        Urinalysis of {{ first_name }} {{ moment(new Date(created_at), "YYYYMMDD").fromNow() }}
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
        <h3 class="subtitle">Physical Examination</h3>
        <div class="content-item split">
          <div class="content-group">
            <label>Color</label>
            <p>{{ color }}</p>
          </div>
          <div class="content-group">
            <label>Reaction</label>
            <p>{{ reaction }}</p>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>Transparency</label>
            <p>{{ transparency }}</p>
          </div>
          <div class="content-group">
            <label>Specific Gravity</label>
            <p>{{ specific_gravity }}</p>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>Sugar</label>
            <p>{{ sugar }}</p>
          </div>
          <div class="content-group">
            <label>Albumin</label>
            <p>{{ albumin }}</p>
          </div>
        </div>

        <h3 class="subtitle">Microscopic Examination</h3>
        <div class="content-item split">
          <div class="content-group">
            <label>RBC</label>
            <p>{{ rbc }}/hpf</p>
          </div>
          <div class="content-group">
            <label>Pus Cells</label>
            <p>{{ pus_cells }}/hpf</p>
          </div>
        </div>

        <h3 class="subtitle">Ephethelial Cells</h3>
        <div class="content-item split">
          <div class="content-group">
            <label>Squamous Cells</label>
            <p>{{ squamous_cells }}</p>
          </div>
          <div class="content-group">
            <label>Calcium Oxalate</label>
            <p>{{ calcium_oxalate }}</p>
          </div>
        </div>

        <h3 class="subtitle">Crystals</h3>
        <div class="content-item split">
          <div class="content-group">
            <label>Uric Acid</label>
            <p>{{ uric_acid }}</p>
          </div>
          <div class="content-group">
            <label>Amorphous Urates</label>
            <p>{{ amorphous_urates }}</p>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>Triple Phosphate</label>
            <p>{{ triple_phospate }}</p>
          </div>
          <div class="content-group">
            <label>Mucus Threads</label>
            <p>{{ mucus_threads }}</p>
          </div>
        </div>
        <div class="content-item split">
          <div class="content-group">
            <label>Others</label>
            <p>{{ others }}</p>
          </div>
          <div class="content-group">
            <label>Bacteria</label>
            <p>{{ bacteria }}</p>
          </div>
        </div>

        <h3 class="subtitle">Special Test</h3>
        <div class="content-item">
          <div class="content-group">
            <label>Pregnancy Test</label>
            <p>{{ pregnancy_test }}</p>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <div v-else><h1 class="text-danger">No Urinalysis record</h1></div>

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
    color: '',
    reaction: '',
    transparency: '',
    specific_gravity: '',
    sugar: '',
    albumin: '',
    rbc: '',
    pus_cells: '',
    squamous_cells: '',
    calcium_oxalate: '',
    amorphous_urates: '',
    uric_acid: '',
    amorphous_urates: '',
    triple_phospate: '',
    mucus_threads: '',
    others: '',
    bacteria: '',
    pregnancy_test: '',
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
      this.color = data.color;
      this.reaction = data.reaction;
      this.transparency = data.transparency;
      this.specific_gravity = data.specific_gravity;
      this.sugar = data.sugar;
      this.albumin = data.albumin;
      this.rbc = data.rbc;
      this.pus_cells = data.pus_cells;
      this.squamous_cells = data.squamous_cells;
      this.calcium_oxalate = data.calcium_oxalate;
      this.uric_acid = data.uric_acid;
      this.amorphous_urates = data.amorphous_urates;
      this.triple_phospate = data.triple_phospate;
      this.mucus_threads = data.mucus_threads;
      this.others = data.others;
      this.bacteria = data.bacteria;
      this.pregnancy_test = data.pregnancy_test;
      this.created_at = moment(new Date(data.created_at)).format("MMM DD, YYYY");
      this.first_name = data.user.first_name;
    },
    getUserLabResults() {
      this.isLoading = true;

      axios.get('/api/urinalyses?filter[user_id]='+this.local_user_id+'&sort=-created_at')
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

      axios.get('/api/urinalyses/'+this.selected_id)
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
             "&filter[seenable_type]=App\\Urinalysis"+
             "&filter[seenable_id]="+this.selected_id;

      axios.get('api/seens?'+params)
      .then((res) => {
        console.log("total urinalysis is...."+res.data.meta.total);
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
        'seenable_type': 'App\\Urinalysis',
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
      window.open(localStorage.getItem("apiURL")+"/print/urinalysis?id="+this.selected_id);
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
