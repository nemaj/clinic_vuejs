 <template>
  <div class="check-up">
    <page-title :heading=heading :subheading=subheading :icon=icon v-on:new-user-added="getCheckUps"></page-title>

    <b-card title="Records" class="main-card mb-4">
      <!--div class="float-right mb-4">
        <b-form inline>
          <label class="mr-2">Filter</label>
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" @keyup="onFiltered" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="clearFilter">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form>
      </div-->
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
          <template v-slot:cell(name)="data">
            {{ data.item.user.last_name.toUpperCase() }},
            {{ data.item.user.first_name }}
            {{ data.item.user.name_suffix }}
            {{ data.item.user.middle_name }}
          </template>

          <template v-slot:cell(queue_at)="data">
            {{ data.item.created_at | relativeTime }}
          </template>

          <template v-slot:cell(actions)="data">
            <div :key="data.item.id">

              <b-dropdown variant="link" size="sm" class="dropdown-menu-rounded" no-caret menu-class="dropdown-menu-sm">
                <span slot="button-content">
                    <button class="btn-shadow btn btn-info" >
                      <span class="lnr-menu"></span>
                    </button>
                </span>

                <div tabindex="-1" class="dropdown-divider"></div>

                <button style="width: 200px" type="button" tabindex="0" @click="openWizardDialog(data.item.user.id, data.item.id)" class="dropdown-item success">
                  <i class="dropdown-icon pe-7s-note2"></i>
                  Treatment
                </button>

                <button type="button" tabindex="0" class="dropdown-item" @click="cancelCheckUp(data.item.id)">
                  <i class="dropdown-icon lnr-trash"></i>
                  Remove From Queue
                </button>
              </b-dropdown>

            </div>
          </template>

          <template v-slot:cell(sex)="data">
            <font-awesome-icon icon="female" style="color:pink;" v-if="data.item.user.sex == 'F'" title="Female" size="3x" />
            <font-awesome-icon icon="male" style="color:blue;" v-else title="Male" size="3x" />
          </template>

          <template v-slot:cell(user_registered)="data">
            {{ data.item.user.created_at | relativeTime }}
          </template>

        </b-table>
      </div>

      <b-pagination align="right" :total-rows="total_rows" v-model="currentPage" :per-page="per_page"></b-pagination>
      <br />
    </b-card>

    <wizard-dialog
      v-model="showWizardDialog"
      :user_id="current_user"
      :check_up_id="current_check_up_id"
      v-on:treated="getCheckUps"
    >
    </wizard-dialog>

    <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
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
  import WizardDialog from "./WizardDialog.vue";

  import { relativeTime } from '@/filters/date';
  import SuccessAlert from "../Components/Alerts/Success.vue";

  export default {
    components: {
      PageTitle,
      OtherInfoDialog,
      EditPatientDialog,
      SendToCheckupButton,
      UserOtherInfoSubTable,
      ErrorAlert,
      WizardDialog,
      SuccessAlert
    },
    filters: {
      relativeTime
    },
    data: () => ({
      showCheckUpDialog: false,
      heading: "Check-up",
      subheading: 'Patients queuing for check-up.',
      icon: 'pe-7s-id icon-gradient bg-happy-itmeo',

      fields: [
        { key: 'queue_no', label: 'Queue No'},

        { key: 'name', label: 'Full Name'},
        'queue_at',
        // { key: 'show_details', label: 'Show Other Info'},
        { key: 'actions', label: 'Actions'},
        'sex',
        { key: 'user.age', label: 'Age'},
        { key: 'user.birthday', label: 'Birthday'},
        { key: 'user.blood_type', label: 'Blood Type'},
        { key: 'user.last_appointment', label: 'Last Appointment'},
        'user_registered'
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
      per_page: 10,
      filter: '',
      isBusy: false,
      isErrorDialog: false,
      errors: [],
      success_message: '',
      isSuccessDialog: false,
      current_user: 0,
      current_check_up_id: 0,
      showWizardDialog: false
    }),
    mounted(){
      this.getCheckUps();
    },
    methods: {
      openWizardDialog(user_id, checkUpID) {
        this.showWizardDialog = true;
        this.current_user = user_id;
        this.current_check_up_id = checkUpID;
      },
      getCheckUps(){
        this.showWizardDialog = false;

        this.isBusy = true;
        //var sort = (this.isSortDesc ? '-'+this.sortBy : this.sortBy);
        var where = (this.filter ? '&filter[full_name]='+this.filter : '');
        //.log(sort);

        var params = '?rows_per_page='+this.per_page
                      +where
                      +'&page='+this.currentPage
                      +'&filter[status]=Q'
                      +'&sort=created_at'

        axios.get('/api/check_ups'+params)
        .then((res) => {
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
        this.getCheckUps();
      },
      onFiltered(){
        this.getCheckUps();
      },
      clearFilter(){
        this.filter = '';
        this.getCheckUps();
      },
      cancelCheckUp(checkUpID){
        var c = confirm("Are you sure you want to cancel this check-up?");

        if (c) {
          axios.put('/api/check_ups/'+checkUpID,{status: 'C'})
          .then((res) => {
            //alert(res.data.user.id);
            axios.put('/api/users/'+res.data.user.id,{is_queue: 0})
            .then((res) => {
                this.success_message = res.data.first_name+" "+res.data.last_name+" removed from today's queue";
                this.isSuccessDialog = true;
                this.getCheckUps();
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
        }
      }
    },
    watch: {
      currentPage: function(val) {
        this.getCheckUps();
      },
      per_page: function(val) {
        this.getCheckUps();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-backdrop
  {
      opacity:0.5 !important;
  }
  .check-up {
    .table-div > .table-responsive {
      min-height: 300px;
    }
  }
</style>
