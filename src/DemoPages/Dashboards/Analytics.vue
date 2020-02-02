<template>
<div class="analytics">
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
    <div class="mb-3 card">
        <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                Portfolio Performance
            </div>
            <!-- <div class="btn-actions-pane-right text-capitalize">
                <button class="btn-wide btn-outline-2x mr-md-2 btn btn-outline-focus btn-sm">View All</button>
            </div> -->
        </div>
        <div class="no-gutters row">
            <div class="col-sm-6 col-md-4 col-xl-4">
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div class="icon-wrapper rounded-circle">
                        <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                        <i class="lnr-users text-dark"></i>
                    </div>
                    <div class="widget-chart-content">
                        <div class="widget-subheading">Total Patients</div>
                        <div class="widget-numbers">{{ totalPatients }}</div>
                        <div class="widget-description opacity-8 text-focus">
                            <router-link to="/patients-records">More Info...</router-link>
                        </div>
                    </div>
                </div>
                <div class="divider m-0 d-md-none d-sm-block"></div>
            </div>
            <div class="col-sm-6 col-md-4 col-xl-4">
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div class="icon-wrapper rounded-circle">
                        <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                        <i class="lnr-layers text-white"></i>
                    </div>
                    <div class="widget-chart-content">
                        <div class="widget-subheading">Queued Patients</div>
                        <div class="widget-numbers"><span>{{ totalQueuePatients }}</span></div>
                        <div class="widget-description opacity-8 text-focus">
                            <router-link to="/checkup">More Info...</router-link>
                        </div>
                    </div>
                </div>
                <div class="divider m-0 d-md-none d-sm-block"></div>
            </div>
            <div class="col-sm-12 col-md-4 col-xl-4">
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
                        <div class="widget-description opacity-8 text-focus">
                            <router-link to="/treated-patients">More Info...</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <diagnosis-analytics></diagnosis-analytics>
    <error-alert v-model="isErrorAlert" :errors="errors"></error-alert>
</div>
</template>

<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import PageTitle from "../../Layout/Components/PageTitle.vue";
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Slick from 'vue-slick';

import Trend from 'vuetrend';

import chart1 from './Analytics/chart1';
import chart2 from './Analytics/chart2';
import chart3 from './Analytics/chart3';

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faTrashAlt,
    faCheck,
    faCalendarAlt,
    faAngleDown,
    faAngleUp,
    faTh
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(
    faTrashAlt,
    faCheck,
    faAngleDown,
    faAngleUp,
    faTh,
    faCalendarAlt
);

import DiagnosisAnalytics from "../../Semicolon/Components/Diagnosis/Analytics";
import ErrorAlert from "../../Semicolon/Components/Alerts/Error";

export default {
    components: {
        PageTitle,
        VuePerfectScrollbar,
        Slick,
        'font-awesome-icon': FontAwesomeIcon,
        'trend': Trend,
        chart1,
        chart2,
        chart3,
        DiagnosisAnalytics,
        ErrorAlert
    },
    data: () => ({
        isErrorAlert: false,
        errors: [],
        heading: 'Analytics Dashboard',
        subheading: '',
        icon: 'pe-7s-graph1  icon-gradient bg-tempting-azure',

        slickOptions2: {
            slidesToShow: 1,
            dots: true,
        },

        fields: [
            {
                key: 'last_name',
                sortable: true
            },
            {
                key: 'first_name',
                sortable: true
            },
            {
                key: 'age',
                label: 'Person age',
                sortable: true,
            }
        ],
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
          { key: 'name', label: 'Diagnosis Name'},
          { key: 'actions', label: 'Actions'},
          { key: 'patients', label: 'Total Diagnosed Patients'}
        ],
        totalPatients: 0,
        totalTreatedPatients: 0,
        totalQueuePatients: 0
    }),
    mounted(){
        this.getTotalPatients();
        this.getTotalTreatedPatients();
        this.getTotalQueuePatients();
    },
    methods: {
        getTotalPatients(){
          this.isLoading = true;

          axios.get('/api/users?filter[type]=G,SC&rows_per_page=1')
          .then((res) => {
            this.isLoading = false;
            this.totalPatients = res.data.meta.total;
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

          axios.get('/api/check_ups?filter[status]=T&filter[user_types]=G,SC&rows_per_page=1')
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
        },
        getTotalQueuePatients(){
          this.isLoading = true;

          axios.get('/api/check_ups?filter[status]=Q&filter[user_types]=G,SC&rows_per_page=1')
          .then((res) => {
            this.isLoading = false;
            this.totalQueuePatients = res.data.meta.total;
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
    }
}
</script>
<style lang="scss" scoped>
  .analytics {
    .table-div > .table-responsive {
      min-height: 300px;
    }
  }
</style>
