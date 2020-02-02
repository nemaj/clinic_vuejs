<template>
  <div class="wizard-prescription">
    <v-card v-show="!isLoading">
      <v-card-text v-if="hasRecord">
        <div class="select-dates mb-2">
          <v-select
            :items="options"
            label="Date"
            v-model="cashier_id"
            item-text="created_at"
            item-value="id"
            @change="getCashierMedicines">
          </v-select> 
        </div>

        <cashier-medicine-table :cashier_medicines="items"></cashier-medicine-table>

      </v-card-text>

      <v-card-text v-else><h1 class="text-danger">No Prescription Record</h1></v-card-text>
    </v-card>
    <div class="text-center" v-show="isLoading">
        <img src="@/assets/images/loading.gif" class="img-fluid" />
    </div>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </div>
</template>

<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import ErrorAlert from '../../Components/Alerts/Error.vue';
import CashierMedicineTable from '../../Components/CashierMedicine/Table';

export default {
  components: { 
    ErrorAlert,
    CashierMedicineTable 
  },
  props:['user_id'],
  data: () => ({
    local_user_id: 0,
    isErrorDialog: false,
    errors: [],
    isLoading:false,
    hasRecord: false,
    cashier_id: 1,
    options: [],
    items: []
  }),
  methods: {
    getUserCashierMedicines(){
      //&filter[has_receipt]=0
      axios.get('/api/cashiers?include=cashiermedicines&filter[user_id]='+this.local_user_id+'&sort=-created_at')
      .then((res) => {
          //console.log(res.data);
          this.isLoading = false;

          if (res.data.data.length) {
            this.hasRecord = true;

            //this.user_other_infos = res.data.data;
            this.options = res.data.data;
            this.cashier_id = res.data.data[0].id;
            this.items = res.data.data[0].cashier_medicines;
          } else {
            this.hasRecord = false;
          }
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
    getCashierMedicines(){
      //&filter[has_receipt]=0
      axios.get('/api/cashiers?include=cashiermedicines&filter[id]='+this.cashier_id+'&sort=-created_at')
      .then((res) => {
          //console.log(res.data);
          this.isLoading = false;

          if (res.data.data.length) {
            this.hasRecord = true;

            this.items = res.data.data[0].cashier_medicines;
          } else {
            this.hasRecord = false;
          }
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
  },
  watch: {
    user_id(val) {
      this.local_user_id = val;
      this.getUserCashierMedicines();
    }
  }
}
</script>

<style lang="scss" scoped>
  .wizard-prescription {
    margin: 0;
    margin-bottom: 30px;
    .custom-field {
      border: 1px solid rgba(26,54,126,.125);
      outline: none;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 13px;
    }
    .select-dates {
      width: 200px;
    }
    .search-data {
      position: absolute;
      right: 15px;
      top: 30px;
    }
  }
</style>