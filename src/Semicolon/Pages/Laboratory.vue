<template>
 <div class="laboratory">
   <page-title :heading=heading :subheading=subheading :icon=icon v-on:new-user-added="getUsers"></page-title>

   <!-- <div class="modal-head">
     <button class="btn btn-success"  @click="openFormDialog">
       Add Lab Test
     </button>
   </div> -->

   <b-card title="Records" class="main-card mb-4">
     <div class="float-right mb-4">
       <b-form inline>
         <label class="mr-2">Filter</label>
         <b-input-group>
           <b-form-input v-model="filter" placeholder="Type to Search" @keyup="onFiltered" />
           <b-input-group-append>
             <b-btn :disabled="!filter" @click="clearFilter">Clear</b-btn>
           </b-input-group-append>
         </b-input-group>
       </b-form>
     </div>
     <!-- <b-row>
       <b-col md="6" class="my-1">
         <b-form-group horizontal label="Filter" class="mb-0">
           <b-input-group>
             <b-form-input v-model="filter" placeholder="Type to Search" @keyup="onFiltered" />
             <b-input-group-append>
               <b-btn :disabled="!filter" @click="clearFilter">Clear</b-btn>
             </b-input-group-append>
           </b-input-group>
         </b-form-group>
       </b-col>

       <b-col md="6" class="my-1">
         <b-form-group horizontal label="Per page" class="mb-0">
           <b-form-select :options="pageOptions" v-model="per_page" />
         </b-form-group>
       </b-col>
     </b-row> -->

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
         :no-local-sorting="true"
         :sort-by.sync="sortBy"
         :sort-desc.sync="isSortDesc"
         @sort-changed="sortChanged"
         :busy="isBusy"
         responsive>

         <template v-slot:table-busy>
           <div class="text-center">
             <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 20%" />
           </div>
         </template>

         <!--custom table cells-->
         <template v-slot:cell(last_name)="data">
           {{ data.item.last_name.toUpperCase() }},
           {{ data.item.first_name }}
           {{ data.item.name_suffix }}
           {{ data.item.middle_name }}
         </template>

         <template v-slot:cell(actions)="data">
           <div :key="data.item.id">

             <b-dropdown variant="link" size="sm" class="dropdown-menu-rounded" no-caret menu-class="dropdown-menu-sm">
               <span slot="button-content">
                 <button class="btn-shadow btn btn-info" >
                   <span class="lnr-menu"></span>
                 </button>
               </span>

               <button type="button" tabindex="0" @click="openFormDialog(data.item.id)" class="dropdown-item success">
                 <!-- <i class="dropdown-icon pe-7s-note2"></i> -->
                 Add/Edit Today's Lab
               </button>

               <div tabindex="-1" class="dropdown-divider"></div>

               <button type="button" tabindex="1" @click="openWizardDialog(data.item.id)" class="dropdown-item success">
                 <!-- <i class="dropdown-icon lnr-trash"></i> -->
                 Lab History
               </button>
             </b-dropdown>

           </div>
         </template>

         <template v-slot:cell(sex)="data">
           <font-awesome-icon icon="female" style="color:pink;" v-if="data.item.sex == 'F'" title="Female" size="3x" />
           <font-awesome-icon icon="male" style="color:blue;" v-else title="Male" size="3x" />
         </template>

         <template v-slot:cell(created_at)="data">
           {{ data.item.created_at | relativeTime }}
         </template>

       </b-table>
     </div>

     <b-pagination align="right" :total-rows="total_rows" v-model="currentPage" :per-page="per_page"></b-pagination>
     <br />
   </b-card>

   <laboratory-dialog
     v-if="showLaboratoryDialog"
     :open="showLaboratoryDialog"
     :user_id="current_user"
     @close="showLaboratoryDialog = false">
   </laboratory-dialog>

   <add-laboratory-test-dialog
     v-model="showLaboratoryFormDialog"
     :user_id="current_user"
   >
   </add-laboratory-test-dialog>

   <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
 </div>
 <!--this is root element-->
</template>

<script>
 import { axios } from '@/plugins/axios';
 import moment from 'moment';
 import PageTitle from "./HeaderCheckUp";
 import SendToCheckupButton from "../Components/SendToCheckup.vue";

 import OtherInfoDialog from "../Components/OtherInfo.vue";
 import EditPatientDialog from "../Components/EditPatient.vue";
 import UserOtherInfoSubTable from '../Components/UserOtherInfoSubTable.vue';
 import ErrorAlert from "../Components/Alerts/Error.vue";
 import LaboratoryDialog from "./../Components/LaboratoryDialog.vue";
 import AddLaboratoryTestDialog from "./../Components/Laboratory/AddLaboratoryTestDialog.vue";

 import { relativeTime } from '@/filters/date'

 export default {
   components: {
     PageTitle,
     OtherInfoDialog,
     EditPatientDialog,
     SendToCheckupButton,
     UserOtherInfoSubTable,
     ErrorAlert,
     LaboratoryDialog,
     AddLaboratoryTestDialog
   },
   filters: {
     relativeTime
   },
   data: () => ({
     showCheckUpDialog: false,
     heading: "Laboratory",
     subheading: '',
     icon: 'pe-7s-eyedropper icon-gradient bg-happy-itmeo',

     fields: [
       'id',
       { key: 'last_name', label: 'Full Name'},
       // { key: 'show_details', label: 'Show Other Info'},
       { key: 'actions', label: 'Actions'},
       'sex',
       { key: 'age', label: 'Age'},
       { key: 'birthday', label: 'Birthday', sortable: true},
       { key: 'blood_type', label: 'Blood Type'},
       { key: 'last_appointment', label: 'Last Appointment', sortable: true},
       { key: 'created_at', label: 'Date Registered', sortable: true}
     ],
     items: [],
     striped: false,
     bordered: false,
     outlined: false,
     small: false,
     hover: true,
     dark: false,
     fixed: false,
     footClone: false,
     infoModal: {
       id: 'info-modal',
       title: '',
       content: ''
     },

     dialog: false,
     blood_type2: ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'],
     date2: new Date().toISOString().substr(0, 10),
     menu: false,
     modal: false,
     menu2: false,
     sortBy: 'last_appointment',
     isSortDesc: true,
     pageOptions: [1, 3, 5, 10],
     currentPage: 1,
     total_rows: 0,
     per_page: 10,
     filter: '',
     isBusy: false,
     isErrorDialog: false,
     errors: [],
     current_user: 0,
     showLaboratoryDialog: false,
     showLaboratoryFormDialog: false
   }),
   mounted(){
     this.getUsers();
   },
   methods: {
     openWizardDialog(user_id) {
       this.showLaboratoryDialog = true;
       this.current_user = user_id;
     },
     openFormDialog(user_id) {
       this.showLaboratoryFormDialog = true;
       this.current_user = user_id;
     },
     getUsers(){
        this.isBusy = true;

        var sort = (this.isSortDesc ? '-'+this.sortBy : this.sortBy);

        var where = (this.filter ? '&filter[full_name]='+this.filter : '');

        console.log(sort);

        var params = '?rows_per_page='+this.per_page
                      +'&page='+this.currentPage
                      +where
                      +'&sort='+sort;

        axios.get('/api/users'+params)
        .then((res) => {
            //console.log(res.data);
            this.items = res.data.data;
            this.total_rows = res.data.meta.total;
            this.isBusy = false;
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
     sortChanged(){
       console.log(this.sortBy+' '+this.isSortDesc);
       this.getUsers();
     },
     onFiltered(){
       this.getUsers();
     },
     clearFilter(){
       this.filter = '';
       this.getUsers();
     }
   },
   watch: {
     currentPage: function(val) {
       this.getUsers();
     },
     per_page: function(val) {
       this.getUsers();
     }
   }
 }
</script>

<style lang="scss" scoped>
 .modal-backdrop
 {
     opacity:0.5 !important;
 }

 .modal-head {
   text-align: right;
   margin-bottom: 15px;
 }

 .app-page-title {
   margin-bottom: 0;
 }
 .laboratory {
   .table-div > .table-responsive {
     min-height: 300px;
   }
 }
</style>
