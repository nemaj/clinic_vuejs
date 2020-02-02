<template>
<div>
  <v-dialog :value="value" persistent max-width="800px">
    <div class="treatement-data">
      <v-card v-show="!isLoading">
        <v-card-title>
          <span class="headline">Treatment Data</span>
        </v-card-title>
        <v-card-text class="contents">

          <div class="text-center">
            <b-form-radio-group
              id="btnradios2"
              buttons
              class="btn-pill btn-dashed"
              button-variant="outline-primary"
              size="lg"
              v-model="selected2"
              :options="options2"
              name="radioBtnOutline"/>
          </div>
          <div class="pt-4 pb-3">
            <!--start Diagnosis and recommendation form-->
            <div class="diagnosis-form" v-if="selected2 === 'diagnosis'">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-layout wrap>
                        <v-flex xs12>
                          <h5 class="text-primary">Diagnosis</h5>
                          <p>{{ diagnosis }}</p>
                        </v-flex>
                        <v-flex xs12 v-show="recommendation">
                          <h5 class="text-primary">Recommendation</h5>
                          <p>{{ recommendation }}</p>
                        </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
            <!--end Diagnosis and recommendation form-->
            <div v-if="selected2 === 'prescription'">
                <h1 class="text-danger text-center" v-show="!hasMedicineRecord">
                  No Medicine Record for this treatment
                </h1>
                <cashier-medicine-table :cashier_medicines="cashier_medicines" v-show="hasMedicineRecord">
                </cashier-medicine-table>
            </div>
          </div>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-show="isLoading">
        <div class="text-center">
            <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 20%" />
        </div>
      </v-card>
    </div>
  </v-dialog>
  <error-alert v-model="isErrorAlert" :errors="errors"></error-alert>
</div>
</template>
<script>
import { axios } from '@/plugins/axios';
import CashierMedicineTable from '../CashierMedicine/Table';
import ErrorAlert from "../Alerts/Error.vue";

export default {
  components: {
    CashierMedicineTable,
    ErrorAlert
  },
  props: ['value', 'check_up_id'],
  data: () => ({
    isLoading: false,
    selected2: 'diagnosis',
    options2: [
      {text: 'Diagnosis And Recommendation', value: 'diagnosis'},
      {text: 'Prescription', value: 'prescription'}
    ],
    isErrorAlert: false,
    errors: [],
    local_check_up_id: 0,
    diagnosis: '',
    recommendation: '',
    hasMedicineRecord: false,
    cashier_medicines: []
  }),
  methods:{
    getDiagnosisAndPrescription(){
      this.isLoading = true;

      axios.get('/api/check_ups/'+this.local_check_up_id)
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

      axios.get('/api/cashiers?include=cashiermedicines&filter[check_up_id]='+this.local_check_up_id)
      .then((res) => {
          this.isLoading = false;

          if (res.data.data.length) {
            this.hasMedicineRecord = true;
            this.cashier_medicines = res.data.data[0].cashier_medicines;
          } else {
            this.hasMedicineRecord = false;
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
    check_up_id(val) {
      this.local_check_up_id = val;
      this.getDiagnosisAndPrescription();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
