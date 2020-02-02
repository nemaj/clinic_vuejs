<template>
<div class="ficalysis-view-form">
  <!-- <div class="modal-head">
    <button class="btn btn-success" @click="openAddModal">
      Add Fecalysis
    </button>
  </div> -->
  <v-card v-if="!isEmptyData">
    <v-card-title v-show="!isLoading">
      <span class="headline">
        <button type="button" class="btn-shadow mr-3 btn btn-primary" title="Print" @click="print">
            <font-awesome-icon icon="print" />
        </button>
        Fecalysis of {{ first_name }} {{ moment(new Date(created_at), "YYYYMMDD").fromNow() }}
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
              <label>Color</label>
              <p> {{ color }}</p>
            </div>
            <div class="content-group">
              <label>Consistency</label>
              <p>{{ consistency }}</p>
            </div>
          </div>

          <h3 class="subtitle">Microscopic Examination</h3>
          <div class="content-item split">
            <div class="content-group">
              <label>Ascaris</label>
              <p>{{ ascaris }}</p>
            </div>
            <div class="content-group">
              <label>Entamoeba Histolytica (Cyst)</label>
              <p>{{ cyst }}</p>
            </div>
          </div>
          <div class="content-item split">
            <div class="content-group">
              <label>T. Trichurs</label>
              <p>{{ t_trichurs }}</p>
            </div>
            <div class="content-group">
              <label>S. Japonicum</label>
              <p>{{ s_japonicum }}</p>
            </div>
          </div>
          <div class="content-item split">
            <div class="content-group">
              <label>Hookworm</label>
              <p>{{ hookworm }}</p>
            </div>
            <div class="content-group">
              <label>Entamoeba Coli</label>
              <p>{{ entamoeba_coli }}</p>
            </div>
          </div>
          <div class="content-item split">
            <div class="content-group">
              <label>Entamoeba Histolytica (Troph)</label>
              <p>{{ troph }}</p>
            </div>
            <div class="content-group">
              <label>Tape Worm</label>
              <p>{{ tape_worm }}</p>
            </div>
          </div>

          <h3 class="subtitle">Others</h3>
          <div class="content-item split">
            <div class="content-group">
              <label>Bacteria</label>
              <p>{{ bacteria }}</p>
            </div>
            <div class="content-group">
              <label>WBC</label>
              <p>{{ wbc }}</p>
            </div>
          </div>
          <div class="content-item split">
            <div class="content-group">
              <label>Fat Globules</label>
              <p>{{ fat_globules }}</p>
            </div>
            <div class="content-group">
              <label>RBC</label>
              <p>{{ rbc }}</p>
            </div>
          </div>
        </div>
    </v-card-text>
  </v-card>
  <div v-else>
    <h1 class="text-danger">No Fecalysis record</h1>
  </div>
  <!-- <add-edit-dialog v-model="showAddEditModal" :user_id="local_user_id"></add-edit-dialog> -->
  <error-alert v-model="isErrorDialog" :erros="errors"></error-alert>
</div>
</template>

<script>
if (localStorage.getItem("user")) {
    var loggedUser = JSON.parse(localStorage.getItem("user"));   
} else {
    var loggedUser = {};
}

import { axios } from '@/plugins/axios';
import moment from 'moment';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import AddEditDialog from "../../Components/Fecalysis/AddEditDialog";

export default {
  components:{
    ErrorAlert,
    AddEditDialog
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
    consistency: '',
    ascaris: '',
    t_trichurs: '',
    hookworm: '',
    troph: '',
    cyst: '',
    s_japonicum: '',
    entamoeba_coli: '',
    tape_worm: '',
    bacteria: '',
    fat_globules: '',
    wbc: '',
    rbc: '',
    created_at: '',
    first_name: '',
    results: [],
    isEmptyData: false,
    showAddEditModal: false
  }),
  mounted(){
    this.local_user_id = this.user_id;

    this.getUserLabResults();
  },
  methods: {
    openAddModal() {
      this.showAddEditModal = true;
    },
    getUserLabResults(){
      console.log('local_user_id', this.local_user_id);
      this.isLoading = true;

      axios.get('/api/fecalyses?filter[user_id]='+this.local_user_id+'&sort=-created_at')
      .then((res) => {
          this.isLoading = false;
          
          this.results = res.data.data;

          if (this.results.length) {
            this.selected_id = res.data.data[0].id;

            this.color = res.data.data[0].color;
            this.consistency = res.data.data[0].consistency;
            this.ascaris = res.data.data[0].ascaris;
            this.t_trichurs = res.data.data[0].t_trichurs;
            this.hookworm = res.data.data[0].hookworm;
            this.troph = res.data.data[0].troph;
            this.cyst = res.data.data[0].cyst;
            this.s_japonicum = res.data.data[0].s_japonicum;
            this.entamoeba_coli = res.data.data[0].entamoeba_coli;
            this.tape_worm = res.data.data[0].tape_worm;
            this.bacteria = res.data.data[0].bacteria;
            this.fat_globules = res.data.data[0].fat_globules;
            this.wbc = res.data.data[0].wbc;
            this.rbc = res.data.data[0].rbc;
            this.created_at = moment(new Date(res.data.data[0].created_at)).format("MMM DD, YYYY");
            this.first_name = res.data.data[0].user.first_name;

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

      axios.get('/api/fecalyses/'+this.selected_id)
      .then((res) => {
          this.isLoading = false;

          this.color = res.data.color;
          this.consistency = res.data.consistency;
          this.ascaris = res.data.ascaris;
          this.t_trichurs = res.data.t_trichurs;
          this.hookworm = res.data.hookworm;
          this.troph = res.data.troph;
          this.cyst = res.data.cyst;
          this.s_japonicum = res.data.s_japonicum;
          this.entamoeba_coli = res.data.entamoeba_coli;
          this.tape_worm = res.data.tape_worm;
          this.bacteria = res.data.bacteria;
          this.fat_globules = res.data.fat_globules;
          this.wbc = res.data.wbc;
          this.rbc = res.data.rbc;
          this.created_at = res.data.created_at;//moment(new Date(res.data.created_at)).format("MMM DD, YYYY");
          this.first_name = res.data.user.first_name;

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
             "&filter[seenable_type]=App\\Fecalysis"+
             "&filter[seenable_id]="+this.selected_id;

      axios.get('api/seens?'+params)
      .then((res) => {
        console.log("total fecalysis is...."+res.data.meta.total);
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
        'seenable_type': 'App\\Fecalysis',
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
      window.open(localStorage.getItem("apiURL")+"/print/fecalysis?id="+this.selected_id);
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
    .modal-head {
      text-align: right;
      margin-bottom: 15px;
    }
  }
</style>