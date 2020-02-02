 <template>
  <div class="patients-records">
    <page-title :heading=heading :subheading=subheading :icon=icon v-on:new-user-added="getUsers"></page-title>

    <b-card title="Records" class="main-card mb-4">
      <b-row>
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
      </b-row>

      <div class="table-div">
        <b-table :striped="striped"
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

          <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Other Info
            </b-button>
          </template>

          <template v-slot:row-details="row">
            <b-card>
              <b-button size="sm" @click="row.toggleDetails">Hide Other Info</b-button>

              <user-other-info-sub-table :key="row.item.id" :user_id="row.item.id"></user-other-info-sub-table>
            </b-card>
          </template>

          <template v-slot:cell(actions)="data">
            <div :key="data.item.id">
              <b-dropdown variant="link" size="sm" class="dropdown-menu-rounded" no-caret menu-class="dropdown-menu-sm">
                <span slot="button-content">
                    <button class="btn-shadow btn btn-info" >
                      <span class="lnr-menu"></span>
                    </button>
                </span>

                <!--other-info-dialog :user_id="data.item.id" v-on:other-info-updated="getUsers"></other-info-dialog-->
                <button style="width: 200px" type="button" tabindex="0" class="dropdown-item info" @click.stop="openUserOtherInfoDialog(data.item.id)">
                  <i class="dropdown-icon pe-7s-note2"></i> Insert/Update Other Info
                </button>

                <div tabindex="-1" class="dropdown-divider"></div>

                <send-to-checkup-button :user_id="data.item.id" v-on:sent-to-queue="getUsers"></send-to-checkup-button>

                <div tabindex="-1" class="dropdown-divider"></div>

                <button style="width: 200px" type="button" tabindex="0" class="dropdown-item success" @click.stop="openPrescriptionDialog(data.item.id, data.item.last_name)" v-show="userType == 'P' || userType == 'D' || userType == 'AD'">
                  <i class="dropdown-icon pe-7s-id"></i>Prescription Today
                </button>

                <div tabindex="-1" class="dropdown-divider"></div>

                <!--edit-patient-dialog :user_id="data.item.id" v-on:user-edited="getUsers"></edit-patient-dialog-->
                <button style="width: 200px" type="button" tabindex="0" class="dropdown-item warning edit_patient" @click.stop="openEditPatientDialog(data.item.id)">
                  <i class="dropdown-icon pe-7s-id"></i>Edit Patient
                </button>

                <!--button type="button" tabindex="0" class="dropdown-item" @click="deleteUser(data.item.id)">
                  <i class="dropdown-icon lnr-trash">
                  </i> Delete Record
                </button-->
              </b-dropdown>
            </div>
          </template>

          <template v-slot:cell(sex)="data">
            <font-awesome-icon icon="female" style="color:pink;" v-if="data.item.sex == 'F'" title="Female" size="3x" />
            <font-awesome-icon icon="male" style="color:blue;" v-else title="Male" size="3x" />
          </template>

        </b-table>
      </div>

      <b-pagination align="center" :total-rows="total_rows" v-model="currentPage" :per-page="per_page">
      </b-pagination>

      <div class="text-center">
        Current Page: {{currentPage}}
      </div>

      <br />
    </b-card>

    <edit-patient-dialog :user_id="userDialogID" v-on:user-edited="getUsers" v-model="showEditPatientDialog">
    </edit-patient-dialog>
    <other-info-dialog :user_id="userDialogID" v-on:other-info-updated="getUsers" v-model="showUserOtherInfoDialog">
    </other-info-dialog>
    <prescription-dialog 
      :user_id="userDialogID" 
      v-model="showPrescriptionDialog"
      :last-name="lastName"
    >
    </prescription-dialog>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
    <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
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
  import PageTitle from "./PageTitle";
  import SendToCheckupButton from "../Components/SendToCheckup.vue";
  import OtherInfoDialog from "../Components/OtherInfo.vue";
  import EditPatientDialog from "../Components/EditPatient.vue";
  import UserOtherInfoSubTable from '../Components/UserOtherInfoSubTable.vue';
  import PrescriptionDialog from '../Components/CashierMedicine/Dialog';
  import ErrorAlert from "../Components/Alerts/Error";
  import SuccessAlert from "../Components/Alerts/Success";

  export default {
    components: {
      PageTitle,
      OtherInfoDialog,
      EditPatientDialog,
      SendToCheckupButton,
      UserOtherInfoSubTable,
      PrescriptionDialog,
      ErrorAlert,
      SuccessAlert
    },
    data: () => ({
      moment: moment,
      heading: "Patient's Records",
      subheading: 'All recorded data of a patient.',
      icon: 'pe-7s-id icon-gradient bg-happy-itmeo',

      fields: [
        { key: 'id', label: 'ID', sortable: true},
        { key: 'last_name', label: 'Full Name', sortable: true},
        { key: 'show_details', label: 'Show Other Info'},
        { key: 'actions', label: 'Actions'},
        'sex',
        {key: 'age'},
        {key: 'birthday', label: 'Birthday', sortable: true},
        'blood_type',
        { key: 'created_at', label: 'Date Registered', sortable: true},
        { key: 'last_appointment', sortable: true}
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
      sortBy: 'id',
      isSortDesc: true,
      pageOptions: [1, 3, 5, 10],
      currentPage: 1,
      total_rows: 0,
      per_page: 5,
      filter: '',
      isBusy: false,
      isErrorDialog: false,
      errors: [],
      isSuccessDialog: false,
      success_message: '',
      showUserOtherInfoDialog: false,
      showEditPatientDialog: false,
      showPrescriptionDialog: false,
      userDialogID: 0,
      lastName: '',
      userType: loggedUser.type
    }),
    mounted(){
      this.getUsers();
    },
    methods: {
      openEditPatientDialog(userID){
        this.showEditPatientDialog = true;
        this.userDialogID = userID;
      },
      openUserOtherInfoDialog(userID){
        this.showUserOtherInfoDialog = true;
        this.userDialogID = userID;
      },
      openPrescriptionDialog(userID, lastName){
        this.showPrescriptionDialog = true;
        this.userDialogID = userID;
        this.lastName = lastName;
      },
      toISOFormat(dateTime){
        var date_time = new Date(dateTime);
        return date_time.toISOString();
      },
      deleteUser(userID){
        var c = confirm("Are you sure you want to delete user id "+userID+"?");

        if (c) {
          axios.delete('/api/users/'+userID)
          .then((res) => {
            this.isSuccessDialog = true;
            this.success_message = "User ID "+userID+" deleted successfully";
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
        } else {
          this.isErrorDialog = true;
          this.errors = [];
          this.errors.push(userID+" not deleted");
        }
      },
      info(item) {
        this.infoModal.title = 'Patient Name: '
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id)
      },
      getUsers(){
        this.isBusy = true;

        var sort = (this.isSortDesc ? '-'+this.sortBy : this.sortBy);

        var where = (this.filter ? '&filter[full_name]='+this.filter : '');

        console.log(sort);

        var params = '?rows_per_page='+this.per_page
                      +'&page='+this.currentPage
                      +where
                      +'&filter[is_queue]=0'
                      +'&filter[type]=G,SC'
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

<style lang="scss">
  .modal-backdrop
  {
      opacity:0.5 !important;
  }
  .patients-records {
    .table-div > .table-responsive {
      min-height: 300px;
    }
  }
</style>
