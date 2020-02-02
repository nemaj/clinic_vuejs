<template>
    <div class="analytics">
        <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
        <div class="mb-3 card">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                    Portfolio Performance
                </div>
                <div class="btn-actions-pane-right text-capitalize">
                    <button class="btn-wide btn-outline-2x mr-md-2 btn btn-outline-focus btn-sm">View All</button>
                </div>
            </div>
            <div class="no-gutters row">
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                            <i class="lnr-laptop-phone text-dark opacity-8"></i></div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Total Patients</div>
                            <div class="widget-numbers">1,7M</div>
                        </div>
                    </div>
                    <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                            <i class="lnr-graduation-hat text-white"></i></div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Queued Patients</div>
                            <div class="widget-numbers"><span>9M</span></div>
                        </div>
                    </div>
                    <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-12 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-9 bg-success"></div>
                            <i class="lnr-apartment text-white"></i></div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Treated Patients Today</div>
                            <div class="widget-numbers text-success"><span>$563</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <b-card title="Diagnosis Analytics" class="main-card mb-4">

          <div class="float-right mb-4">
            <b-form inline>
              <label class="mr-2">Filter</label>
              <b-input-group>
                <b-form-input placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn>Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form>
          </div>

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
              responsive>

            </b-table>
          </div>

          <b-pagination align="right" :total-rows="total_rows" v-model="currentPage" :per-page="per_page"></b-pagination>

        </b-card>

    </div>

</template>

<script>
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

export default {
    components: {
        PageTitle,
        VuePerfectScrollbar,
        Slick,
        'font-awesome-icon': FontAwesomeIcon,
        'trend': Trend,
        chart1,
        chart2,
        chart3
    },
    data: () => ({
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
        items: [
          {
            no: 1,
            name: 'Sample Name',
            actions: '',
            patients: 10,
          },
          {
            no: 2,
            name: 'Another Name',
            actions: '',
            patients: 5,
          }
        ],
        currentPage: 1,
        total_rows: 0,
        per_page: 10
    }),
    methods: {
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
