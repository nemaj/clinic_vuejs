<template>
  <div class="add-medicine">
    <page-title :heading="heading" :subheading="subheading" :icon="icon" v-on:add-dialog="openAddDialog" v-on:add-generic="openAddGeneric"></page-title>

    <b-card title="Diagnosis Analytics" class="main-card mb-4">

      <div class="float-right mb-4">
        <b-form inline>
          <label class="mr-2">Filter</label>
          <b-input-group>
            <b-form-input placeholder="Type to Search" v-model="filter" @keyup="getMedicines" />
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
          :sort-by.sync="sortBy"
          :sort-desc.sync="isSortDesc"
          @sort-changed="sortChanged"
          responsive>

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

                <button style="width: 200px" type="button" tabindex="0" class="dropdown-item warning" @click.stop="openEditDialog(data.item.id)">
                  <i class="dropdown-icon pe-7s-id"></i> Edit Medicine
                </button>

                <!-- <div tabindex="-1" class="dropdown-divider"></div> -->

                <!--button style="width: 200px" type="button" tabindex="0" class="dropdown-item danger">
                  <i class="dropdown-icon lnr-trash">
                  </i> Delete
                </button-->
              </b-dropdown>
            </div>
          </template>

        </b-table>
      </div>

      <b-pagination align="right" :total-rows="total_rows" v-model="currentPage" :per-page="per_page"></b-pagination>

    </b-card>

    <add-medicine-dialog v-model="openAddMedicineDialog" v-on:list-updated="getMedicines">
    </add-medicine-dialog>

    <add-generic-dialog v-model="openAddGenericDialog" v-on:list-updated="getMedicines">
    </add-generic-dialog>

    <edit-medicine-dialog
      v-model="openEditMedicineDialog"
      :medicine_id="current_medicine_id"
      v-on:list-updated="getMedicines"
    >
    </edit-medicine-dialog>

    <success-alert v-model="isSuccessAlert">{{ success_message }}</success-alert>
    <error-alert v-model="isErrorAlert" :errors="errors"></error-alert>
  </div>
</template>
<script>
import { axios } from '@/plugins/axios';
import PageTitle from "../Components/Medicine/Header.vue";
import AddMedicineDialog from '../Components/Medicine/AddDialog.vue';
import AddGenericDialog from '../Components/Medicine/AddGenericDialog.vue';
import EditMedicineDialog from '../Components/Medicine/EditMedicineDialog.vue';
import SuccessAlert from '../Components/Alerts/Success';
import ErrorAlert from '../Components/Alerts/Error';

export default {
  components: {
    PageTitle,
    AddMedicineDialog,
    AddGenericDialog,
    EditMedicineDialog,
    SuccessAlert,
    ErrorAlert
  },
  data: () => ({
    heading: "Medicine",
    subheading: '',
    icon: 'pe-7s-plus icon-gradient bg-happy-itmeo',

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
      'id',
      { key: 'generic.name', label: 'Generic Name'},
      'actions',
      { key: 'name', label: 'Brand Name', sortable: true},
      { key: 'material_text', label: 'Material'}
    ],
    items: [],
    currentPage: 1,
    total_rows: 0,
    per_page: 10,
    openAddGenericDialog: false,
    openAddMedicineDialog: false,
    current_medicine_id: 0,
    openEditMedicineDialog: false,
    isLoading: false,
    isErrorAlert: false,
    errors: [],
    isSuccessAlert: false,
    success_message: '',
    filter:'',
    isSortDesc: true,
    sortBy: 'id'
  }),
  mounted(){
    this.getMedicines();
  },
  methods: {
    getMedicines(){
      this.isLoading = true;

      var sort = (this.isSortDesc ? '-'+this.sortBy : this.sortBy);

      var params = 'filter[medicine_or_generic]='+this.filter
                  +'&page='+this.currentPage
                  +'&rows_per_page='+this.per_page
                  +'&sort='+sort;

      axios.get('/api/medicines?'+params)
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
    clearFilter(){
      this.filter = '';
      this.getMedicines();
    },
    openAddDialog() {
      this.openAddMedicineDialog = true;
    },
    openAddGeneric() {
      console.log('open')
      this.openAddGenericDialog = true;
    },
    openViewAnalytics(user_id) {
      console.log('open view modal', user_id);
    },
    openEditDialog(id) {
      this.current_medicine_id = id;
      this.openEditMedicineDialog = true;
    },
    sortChanged(){
      console.log(this.sortBy+' '+this.isSortDesc);
      this.getMedicines();
    }
  },
  watch: {
    currentPage: function(val) {
      this.getMedicines();
    },
    per_page: function(val) {
      this.getMedicines();
    }
  }
}
</script>
<style lang="scss" scoped>
  .add-medicine {
    .table-div > .table-responsive {
      min-height: 300px;
    }
  }
</style>
