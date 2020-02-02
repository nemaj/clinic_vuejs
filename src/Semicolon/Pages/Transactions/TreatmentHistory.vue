<template>
<div>

<page-title :heading="heading" :subheading="subheading" v-on:search-user="getUsers"></page-title>

<b-row>
    <b-col md="10">
        <b-button-toolbar aria-label="User Types">
          <b-form-radio-group
            v-model="user_type"
            :options="types"
            buttons
            button-variant="outline-primary"
            size="lg"
            name="radio-btn-outline"
          >
          </b-form-radio-group>
        </b-button-toolbar>
       </b-col>

    <b-col md="2">
        <b-input-group append="per page">
            <b-form-select :options="pageOptions" v-model="per_page" />
        </b-input-group>
    </b-col>
</b-row>

<div class="text-center" v-show="isLoading">
    <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 20%" />
</div>

<treatment-history-cards :results="results" v-show="!isLoading" v-on:preview-treatment="openTreatmentDialog">
</treatment-history-cards>

<b-pagination align="center" :total-rows="total_rows" v-model="currentPage" :per-page="per_page">
</b-pagination>

<error-alert v-model="isErrorDialog" :errors="errors"></error-alert>

<view-treatment v-model="showDialog" :user_id="current_user"></view-treatment>

</div>
</template>
<script>
import PageTitle from './TreatmentHistory/PageTitle';
import TreatmentHistoryCards from './TreatmentHistory/Cards';
import { axios } from '@/plugins/axios';
import moment from 'moment';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import ViewTreatment from "../../Components/Treatment/ViewTreatment.vue";

export default {
    components: {
        PageTitle,
        TreatmentHistoryCards,
        ErrorAlert,
        ViewTreatment
    },
    data: () => ({
        heading: 'Treatment History',
        subheading: 'Users record of their treatments',
        moment: moment,
        isLoading: false,
        errors: [],
        isErrorDialog: false,
        results: [],
        types: [
          { text: 'All', value: '' },
          { text: 'Senior Citizen', value: 'SC'},
          { text: 'Staff', value: 'D,A,M,AD,P' }
          // { text: 'Guest', value: 'G' },
          // { text: 'Senior Citizen', value: 'SC'},
          // { text: 'Med Tech', value: 'M' },
          // { text: 'Assistant', value: 'A' },
          // { text: 'Doctor', value: 'D' }
        ],
        user_type: '',
        pageOptions: [3, 5, 10],
        per_page: 5,
        total_rows: 0,
        currentPage: 1,
        per_page: 5,
        showDialog: false,
        current_user: 0
    }),
    mounted(){
        this.getUsers();
    },
    methods: {
        getUsers(name = "") {
            this.isLoading = true;

            axios.get('/api/users?'
                +'filter[full_name]='+name
                +'&filter[type]='+this.user_type
                +'&rows_per_page='+this.per_page
                +'&page='+this.currentPage)
            .then((res) => {
                this.isLoading = false;
                this.results = res.data.data;
                this.total_rows = res.data.meta.total;
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
        openTreatmentDialog(user_id) {
            this.showDialog = true;
            this.current_user = user_id;
            console.log('id', user_id);
        }
    },
    watch: {
        currentPage: function(val) {
            this.getUsers();
        },
        per_page: function (val){
            this.getUsers();
        },
        user_type: function(val) {
            this.getUsers();
        }
    }
}
</script>