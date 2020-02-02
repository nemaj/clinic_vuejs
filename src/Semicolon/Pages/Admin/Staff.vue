<template>
<div>
    <page-title :heading=heading :subheading=subheading :icon=icon v-on:new-user-added="getUsers"></page-title>
    
	<b-row>
        <b-col md="4">
            <b-form-group horizontal>
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search Name" @keyup="onFiltered" />
                  <b-input-group-append>
                    <b-btn :disabled="!filter" @click="clearFilter">Clear</b-btn>
                  </b-input-group-append>
                </b-input-group>
            </b-form-group>    
        </b-col>

        <b-col md="6">
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

    <cards :users="users" v-show="!isLoading" v-on:open-modal="openAddEditModal"></cards>

    <b-pagination align="center" :total-rows="total_rows" v-model="currentPage" :per-page="per_page">
    </b-pagination>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>

    <edit-dialog v-model="showAddEditModal" :user_id="current_user_id" v-on:user-edited="getUsers">
    </edit-dialog>
</div>
</template>

<script>
import { axios } from '@/plugins/axios';
import PageTitle from './Staff/PageTitle';
import Cards from '../../Components/Staff/Cards';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import EditDialog from '../../Components/Staff/EditDialog';

export default {
    components: {
        Cards,
        PageTitle,
        ErrorAlert,
        EditDialog
    },
    data: () => ({
        heading: 'Staff',
        subheading: 'Our beloved employees',
        icon: 'pe-7s-drop icon-gradient bg-mean-fruit',
        isLoading: false,
        errors: [],
        isErrorDialog: false,
        showAddEditModal: false,
        current_user_id: 0,
    	users: [],
        types: [
          { text: 'All', value: 0},
          { text: 'Doctor', value: 'D' },
          { text: 'Assistant', value: 'A'},
          { text: 'Medical Technologist', value: 'M' },
          { text: 'Pharmacist', value: 'P' }
        ],
        user_type: 0,
        filter: '',
        pageOptions: [3, 5, 10],
        per_page: 5,
        currentPage: 1,
        total_rows: 0
    }),
    mounted(){
        this.getUsers();	
    },
    methods: {
    	getUsers(){
            this.isLoading = true;

            var filterType = (!this.user_type ? 'filter[type]=D,A,M,P' : '&filter[type]='+this.user_type);
            /*if (!this.user_type) {
                var filterType = 'filter[type]=D,A,M';
            } else {
                var filterType = '&filter[type]='+this.user_type;
            }*/

    		var params = "?"+filterType
                        +"&filter[full_name]="+this.filter
                        +"&sort=-id"
                        +"&rows_per_page="+this.per_page
                        +"&page="+this.currentPage;

    		axios.get('/api/users'+params)
	    	.then((res) => {
                this.isLoading = false;
	    		this.users = res.data.data;
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
        openAddEditModal(selected_user_id){
            this.showAddEditModal = true;
            this.current_user_id = selected_user_id;
        },
        clearFilter(){
          this.filter = '';
        },
        onFiltered(){
            this.getUsers();
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