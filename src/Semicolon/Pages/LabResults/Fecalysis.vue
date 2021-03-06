<template>
<div>
    <page-title :heading=heading :subheading=subheading :icon=icon v-on:search-user="getUsers"></page-title>
    
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

    <fecalysis-cards :users="users" v-show="!isLoading" v-on:open-modal="openAddEditModal" v-on:view-log="openViewDialog">
    </fecalysis-cards>

    <b-pagination align="center" :total-rows="total_rows" v-model="currentPage" :per-page="per_page"></b-pagination>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>

    <add-edit-dialog v-model="showAddEditModal" :user_id="current_user_id" v-on:result-updated="getUsers">
    </add-edit-dialog>

    <view-dialog :unique_id="lab_result_id" v-model="showViewDialog"></view-dialog>
</div>
</template>

<script>
import { axios } from '@/plugins/axios';
import PageTitle from './Fecalysis/PageTitle';
import FecalysisCards from './Fecalysis/Cards';
import AddEditDialog from "../../Components/Fecalysis/AddEditDialog";
import ViewDialog from "../../Components/Fecalysis/ViewDialog";
import ErrorAlert from "../../Components/Alerts/Error.vue";

export default {
    components: {
        FecalysisCards,
        PageTitle,
        AddEditDialog,
        ViewDialog,
        ErrorAlert
    },
    data: () => ({
        heading: 'Fecalysis',
        subheading: 'Users record of fecalysis',
        icon: 'pe-7s-drop icon-gradient bg-cheerful-caramel',
        isLoading: false,
        errors: [],
        isErrorDialog: false,
    	users: [],
        types: [
          { text: 'All', value: 0},
          { text: 'Guest', value: 'G' },
          { text: 'Senior Citizen', value: 'SC'},
          { text: 'Staff', value: 'S' }
        ],
        user_type: 0,
        pageOptions: [3, 5, 10],
        per_page: 5,
        currentPage: 1,
        total_rows: 0,
        showAddEditModal: false,
        current_user_id: 0,
        showViewDialog: false,
        lab_result_id: 0
    }),
    mounted(){
        this.getUsers();	
    },
    methods: {
    	getUsers(name = ""){
            this.isLoading = true;

            if (!this.user_type) {
                var filterType = '';
            } else if (this.user_type == 'S') {
                var filterType = '&filter[type]=D,A,M';
            } else {
                var filterType = '&filter[type]='+this.user_type;
            }

    		var params = "?include=fecalyses"
                        +"&filter[full_name]="+name
                        +filterType
                        +"&sort=-last_name"
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
        openViewDialog(labResultID){
            this.showViewDialog = true;
            this.lab_result_id = labResultID;
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