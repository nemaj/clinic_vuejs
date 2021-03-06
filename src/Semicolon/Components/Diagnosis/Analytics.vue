<template>
  <div>
    <b-card title="Diagnosis Analytics" class="main-card mb-4">

      <div class="float-right mb-4">
        <b-form inline>
          <label class="mr-2">Filter</label>
          <b-input-group>
            <b-form-input placeholder="Type to Search" v-model="filter" @keyup="getDiagnoses" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="clearFilter">Clear</b-btn>
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
          :busy="isLoading"
          responsive
        >

          <template v-slot:table-busy>
            <div class="text-center">
              <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 20%" />
            </div>
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
                <button style="width: 200px" type="button" tabindex="0" class="dropdown-item info" @click.stop="openViewAnalytics(data.item)">
                  <i class="dropdown-icon pe-7s-note2"></i> View Analytics
                </button>

                <div tabindex="-1" class="dropdown-divider"></div>

                <button style="width: 200px" type="button" tabindex="0" class="dropdown-item warning edit_patient" @click.stop="openEditDialog(data.item)">
                  <i class="dropdown-icon pe-7s-id"></i> Edit Diagnosis
                </button>

                <!--button style="width: 200px" type="button" tabindex="0" class="dropdown-item danger">
                  <i class="dropdown-icon lnr-trash">
                  </i> Delete
                </button-->
              </b-dropdown>
            </div>
          </template>

          <template v-slot:cell(diagnosis_users)="data">
            {{ data.item.diagnosis_users.length }}
          </template>

        </b-table>
      </div>

      <b-pagination align="right" :total-rows="total_rows" v-model="currentPage" :per-page="per_page"></b-pagination>

    </b-card>

    <view-analytics-dialog v-model="openViewAnalyticsDialog" :diagnosis="diagnosis">
    </view-analytics-dialog>

    <edit-diagnosis-dialog v-model="showEditDialog" :diagnosis="diagnosis">
    </edit-diagnosis-dialog>

    <success-alert v-model="isSuccessAlert">{{ success_message }}</success-alert>
    <error-alert v-model="isErrorAlert" :errors="errors"></error-alert>
  </div>
</template>
<script>
import { axios } from '@/plugins/axios';
import ViewAnalyticsDialog from '../Diagnosis/ViewAnalyticsDialog.vue';
import EditDiagnosisDialog from '../Diagnosis/EditDialog';
import SuccessAlert from '../Alerts/Success';
import ErrorAlert from '../Alerts/Error';

export default {
  components: {
    ViewAnalyticsDialog,
    EditDiagnosisDialog,
    SuccessAlert,
    ErrorAlert
  },
  props: ['reload'],
  data: () => ({
    isLoading: false,
    success_message: '',
    isSuccessAlert: false,
    isErrorAlert:false,
    errors: [],
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
      { key: 'diagnosis_users',label: 'Total Diagnosed Patients'}
    ],
    items: [],
    currentPage: 1,
    total_rows: 0,
    per_page: 10,
    openViewAnalyticsDialog: false,
    diagnosis: {},
    showEditDialog: false
  }),
  mounted(){
    this.getDiagnoses();
  },
  methods: {
    getDiagnoses(){
      this.isLoading = true;

      axios.get('/api/diagnoses?include=diagnosisusers&filter[name]='+this.filter+'&page='+this.currentPage+'&sort=-id&rows_per_page='+this.per_page)
      .then((res) => {
        this.isLoading = false;
        this.items = res.data.data;
        this.total_rows = res.data.meta.total;
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
    openViewAnalytics(diagnosis) {
      console.log('open view modal', diagnosis);
      this.diagnosis = diagnosis;
      this.openViewAnalyticsDialog = true;
    },
    clearFilter(){
      this.filter = '';
      this.getDiagnoses();
    },
    openEditDialog(diagnosis){
      this.diagnosis = diagnosis;
      this.showEditDialog = true;
    }
  },
  watch: {
    currentPage: function(val) {
      this.getDiagnoses();
    },
    per_page: function(val) {
      this.getDiagnoses();
    },
    reload(val){
      if (val) {
        this.getDiagnoses();
      }
    }
  }
}
</script>