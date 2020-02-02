<template>
  <div class="treated-patients">
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>

    <b-card title="" class="main-card mb-4">

      <b-row class="mb-4">
        <b-col md="6" class="my-1">
          <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
              <div class="icon-wrapper rounded-circle">
                  <div class="icon-wrapper-bg opacity-9 bg-success"></div>
                  <i class="lnr-checkmark-circle text-white"></i>
              </div>
              <div class="widget-chart-content">
                  <div class="widget-subheading">Treated Patients</div>
                  <div class="widget-numbers text-success"><span>
                      {{ totalTreatedPatients }}
                  </span></div>
              </div>
          </div>
        </b-col>

        <b-col md="6" class="my-1">
          <v-menu
            lazy
            :close-on-content-click="true"
            v-model="menu1"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Select Date"
              v-model="date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" no-title scrollable actions :max="max">
            </v-date-picker>
          </v-menu>
        </b-col>
      </b-row>

      <div class="table-div">
        <b-table
          :striped="striped"
          :bordered="bordered"
          :outlined="outlined"
          :small="small"
          :hover="hover"
          :dark="dark"
          :fixed="fixed"
          :foot-clone="footClone"
          :items="items"
          :fields="fields"
          :busy="isLoading"
          responsive>

          <template v-slot:table-busy>
            <div class="text-center">
              <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 20%" />
            </div>
          </template>

           <template v-slot:cell(patient_name)="data">
            {{ data.item.user.last_name.toUpperCase() }},
            {{ data.item.user.first_name }}
            {{ data.item.user.name_suffix }}
            {{ data.item.user.middle_name }}
          </template>

          <template v-slot:cell(actions)="data">
            <div :key="data.item.id">
              <b-dropdown variant="link" size="sm" class="dropdown-menu-rounded" no-caret menu-class="dropdown-menu-sm">
                <span slot="button-content">
                    <button class="btn-shadow btn btn-info" >
                      <span class="lnr-menu"></span>
                    </button>
                </span>

                <button style="width: 200px" type="button" tabindex="0" class="dropdown-item warning" @click.stop="openTreatmentDialog(data.item.user.id)">
                  <i class="dropdown-icon pe-7s-id"></i> View Treatement
                </button>

              </b-dropdown>
            </div>
          </template>

          <template v-slot:cell(sex)="data">
            <font-awesome-icon icon="female" style="color:pink;" v-if="data.item.user.sex == 'F'" title="Female" size="3x" />
            <font-awesome-icon icon="male" style="color:blue;" v-else title="Male" size="3x" />
          </template>

        </b-table>
      </div>

      <b-pagination align="center" :total-rows="total_rows" v-model="currentPage" :per-page="per_page">
      </b-pagination>
    </b-card>

    <view-treatment v-model="showTreatmentDialog" :user_id="user_id"></view-treatment>

    <error-alert v-model="isErrorAlert" :errors="errors"></error-alert>
    <success-alert v-model="isSuccessAlert">{{ success_message }}</success-alert>
  </div>
</template>
<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../Components/Alerts/Error";
import SuccessAlert from "../Components/Alerts/Success";
import moment from 'moment';
import PageTitle from '../Components/TreatedPatients/Header.vue';
import ViewTreatment from "../Components/Treatment/ViewTreatment.vue";

export default {
  components: {
    PageTitle,
    ErrorAlert,
    SuccessAlert,
    ViewTreatment
  },
  data: () => ({
    max: moment().format("YYYY-MM-DD"),
    heading: "Treated Patients",
    subheading: '',
    icon: 'pe-7s-eyedropper icon-gradient bg-happy-itmeo',
    date: moment().format("YYYY-MM-DD"),
    menu1: false,
    striped: false,
    bordered: false,
    outlined: false,
    small: false,
    hover: true,
    dark: false,
    fixed: false,
    footClone: false,
    filter: '',
    fields: [
      {key: 'queue_no', label: 'Queue No'},
      'patient_name',
      {key: 'diagnosis', label: 'Diagnosis'},
      'actions',
      'user.age',
      'user.sex',
      {key: 'user.blood_type', label: 'Blood Type'}
    ],
    items: [],
    currentPage: 1,
    total_rows: 0,
    per_page: 10,
    pageOptions: [1, 3, 5, 10],
    showTreatmentDialog: false,
    isErrorAlert: false,
    isSuccessAlert: false,
    errors: [],
    success_message: '',
    isLoading: false,
    user_id: 0,
    totalTreatedPatients: 0
  }),
  mounted() {
    //do something after mounting vue instance
    //this.getDateNow();
    this.getTreatedPatients();
    this.getTotalTreatedPatients();
  },
  methods: {
    getDateNow() {
      console.log(moment(new Date()));
    },
    openTreatmentDialog(userID) {
      this.showTreatmentDialog = true;
      this.user_id = userID;
    },
    getTreatedPatients(){
      this.isLoading = true;

      var params = '?filter[this_day]='+this.date
                    +'&filter[user_types]=G,SC'
                    +'&filter[status]=T'
                    +'&rows_per_page='+this.per_page
                    +'&page='+this.currentPage
                    +'&sort=-created_at'

      axios.get('/api/check_ups'+params)
      .then((res) => {
          this.items = res.data.data;
          this.total_rows = res.data.meta.total;
          this.isLoading = false;
      })
      .catch((error) => {
          this.isErrorAlert = true;
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
    getTotalTreatedPatients(){
      this.isLoading = true;

      axios.get('/api/check_ups?filter[status]=T&filter[this_day]='+this.date+'&filter[user_types]=G,SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalTreatedPatients = res.data.meta.total;
      })
      .catch((error) => {
          this.isErrorAlert = true;
          this.isLoading = false;
          this.errors = [];
          this.errors.push(error);

          if (error.response.data.errors !== undefined) {
            Object.entries(error.response.data.errors).forEach(
                ([key, value]) => this.errors.push(value.toString())
            );
          }
      });
    }
  },
  watch: {
    date(val){
      this.getTreatedPatients();
      this.getTotalTreatedPatients();
    },
    currentPage: function(val) {
      this.getTreatedPatients();
    },
    per_page: function(val) {
      this.getTreatedPatients();
    }
  }
}
</script>
<style lang="scss" scoped>
  .treated-patients {
    .table-div > .table-responsive {
      min-height: 300px;
    }
    .total-items {
      display: flex;
    }
  }
</style>
