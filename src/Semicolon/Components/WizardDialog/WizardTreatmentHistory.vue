<template>
<div>
<v-card v-show="!isLoading">
  <v-card-text>
    <v-container>
      <div class="text-center">
        <v-layout wrap>
          <v-flex sm12>
            <v-select v-show="hasTreatmentRecord"
                :items="options"
                label="Pick a Check-Up date"
                v-model="check_up_id"
                item-text="created_at_text"
                item-value="id">
            </v-select>
          </v-flex>
        </v-layout>
      </div>
      <div class="pt-4 pb-3">
        <v-layout wrap v-show="hasTreatmentRecord">
            <v-flex xs12>
              <label>Diagnosis</label>
              <v-textarea solo rows="3" v-model="diagnosis" readonly></v-textarea>
            </v-flex>
            <v-flex xs12>
              <label>Recommendation</label>
              <v-textarea solo rows="3" v-model="recommendation" readonly></v-textarea>
            </v-flex>

        </v-layout>
        
        <v-layout wrap v-show="!hasTreatmentRecord">
          <v-flex xs12><h1 class="text-danger text-center">No Treatment Record Yet</h1></v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-card-text>
</v-card>

<div class="text-center" v-show="isLoading">
    <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 20%" />
</div>
<error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
<success-alert v-model="isSuccessAlert">{{ success_message }}</success-alert>
</div>
</template>

<script>
import ErrorAlert from "../../Components/Alerts/Error.vue";
import SuccessAlert from '../../Components/Alerts/Success';
import { axios } from '@/plugins/axios';
import CashierMedicineTable from '../../Components/CashierMedicine/Table';

export default {
  components: {
    ErrorAlert,
    CashierMedicineTable,
    SuccessAlert
  },
  props: ['user_id'],
  data: () => ({
    diagnosis: '',
    recommendation: '',
    cashier_medicines: [],
    check_up_id: 0,
    cashier_id: 0,
    options: [],
    options_cashier: [],
    isLoading: false,
    errors: [],
    isErrorDialog: false,
    local_user_id: 0,
    hasTreatmentRecord: false,
    hasMedicineRecord: false,
    isSuccessAlert: false,
    success_message: ''
  }),
  watch: {
    user_id(val){
      this.local_user_id = val;
      this.isLoading = true;

      axios.get('/api/check_ups?filter[user_id]='+val+'&filter[status]=T&sort=-created_at')
      .then((res) => {
          this.isLoading = false;

          if (res.data.data.length) {
            this.hasTreatmentRecord = true;
            this.options = res.data.data;
            this.check_up_id = res.data.data[0].id;
          } else {
            this.hasTreatmentRecord = false;
            this.options = [];
            this.check_up_id = 0;
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
    check_up_id(val){
      if (val) {    
        this.isLoading = true;

        axios.get('/api/check_ups/'+val)
        .then((res) => {
            this.isLoading = false;
           
            this.diagnosis = res.data.diagnosis;
            this.recommendation = res.data.recommendation;
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
  }
}


  function updateButtonProgress(duration, button) {
    var start = null;

    function update(timestamp) {
      var delta, progress;
      if (!start) start = timestamp;
      delta = timestamp - start;
      progress = delta / duration;
      if (progress >= 1 || progress < 0) return;
      button.progress = progress;
      window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);
  }
</script>

<style lang="scss" scoped>
  .view-treatment {
    .select-dates {
      width: 200px;
    }
    .search-data {
      position: absolute;
      right: 15px;
      top: 30px;
    }
    label {
      font-size: 14px;
    }
    .v-text-field {
      padding-top: 0;
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
</style>