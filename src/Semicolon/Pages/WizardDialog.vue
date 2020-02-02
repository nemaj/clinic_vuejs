<template>
<div>
 <v-dialog :value="value" persistent max-width="1100px">
    <v-card>
      <v-card-text>
        <v-container>
          <form-wizard
            title="Treatment"
            subtitle=""
            shape="square"
            color="#3498db"
            @on-complete="onComplete"
            v-show="!isLoading"
            ref="checkUpWizard"
          >

            <tab-content
              title="Other Informations"
              icon="pe-7s-display2">
              <wizard-other-info :user_id="local_user_id"></wizard-other-info>
            </tab-content>

            <tab-content
              title="Laboratory"
              icon="pe-7s-light">
              <template>
                <div class="text-center">
                  <lab-test-tab 
                    :user-id="local_user_id"
                    :fecalysis-counter="fecalysisCounter"
                    :urinalysis-counter="urinalysisCounter"
                    :hematology-counter="hematologyCounter"
                    :blood-chemistry-counter="bloodChemistryCounter"
                    :special-test-counter="specialTestCounter"
                    :miscellaneous-counter="miscellaneousCounter"
                    v-on:clicked="getSelectedLabTab"
                  >
                  </lab-test-tab>
                </div>

                <div class="pt-4 pb-3" :key="local_user_id">
                  
                  <fecalysis-view-form 
                    v-if="selected2 == 'fecalysis'" 
                    :user_id="local_user_id" 
                    v-on:seen="fecalysisCounter++"
                  >
                  </fecalysis-view-form>
                  <urinalysis-view-form 
                    v-if="selected2 == 'urinalysis'" 
                    :user_id="local_user_id"
                    v-on:seen="urinalysisCounter++"
                  >
                  </urinalysis-view-form>
                  <hematology-view-form 
                    v-if="selected2 == 'hematology'" 
                    :user_id="local_user_id"
                    v-on:seen="hematologyCounter++"
                  >
                  </hematology-view-form>
                  <blood-chemistry-view-form 
                    v-if="selected2 == 'blood-chemistry'" 
                    :user_id="local_user_id"
                    v-on:seen="bloodChemistryCounter++"
                  >
                  </blood-chemistry-view-form>
                  <special-test-view-form 
                    v-if="selected2 == 'special-test'" 
                    :user_id="local_user_id"
                    v-on:seen="specialTestCounter++"
                  >
                  </special-test-view-form>
                  <miscellaneous-view-form 
                    v-if="selected2 == 'miscellaneous'" 
                    :user_id="local_user_id"
                    v-on:seen="miscellaneousCounter++"
                  >
                  </miscellaneous-view-form>
                </div>
              </template>
            </tab-content>

            <tab-content
              title="Prescription History"
              icon="pe-7s-clock">
              <wizard-prescription-history :user_id="local_user_id"></wizard-prescription-history>
            </tab-content>

            <tab-content
              title="Treatment History"
              icon="pe-7s-display2">
              <wizard-treatment-history :user_id="local_user_id"></wizard-treatment-history>
            </tab-content>

            <tab-content
              title="Diagnosis and Recommendation"
              icon="pe-7s-joy">
              <diagnosis-and-recommendation-form 
                v-on:diagnosed="getDiagnosis" 
                v-on:recommended="getRecommendation"
                :key="local_user_id"
              >
              </diagnosis-and-recommendation-form>
            </tab-content>

            <!--tab-content
              title="Prescription"
              icon="pe-7s-news-paper">
              <wizard-prescription v-on:prescribe="getPrescribedMedicines" :key="local_user_id"></wizard-prescription>
            </tab-content-->

          </form-wizard>

          <div class="text-center" v-show="isLoading">
            <img src="@/assets/images/loading.gif" class="img-fluid" />
          </div>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
        <!-- <v-btn color="blue darken-1" flat>Save</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>

  <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
</div>
</template>

<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import { FormWizard, TabContent } from 'vue-form-wizard'
import Tabs from 'vue-tabs-with-active-line';
import VueLadda from '../../assets/components/ladda-loading/src/vue-ladda'
import WizardOtherInfo from '../Components/WizardDialog/WizardOtherInfo';
import WizardPrescription from '../Components/WizardDialog/WizardPrescription';
import WizardTreatmentHistory from '../Components/WizardDialog/WizardTreatmentHistory';
import WizardPrescriptionHistory from '../Components/WizardDialog/WizardPrescriptionHistory';
import FecalysisViewForm from '../Components/Fecalysis/ViewForm';
import UrinalysisViewForm from '../Components/Urinalysis//ViewForm';
import HematologyViewForm from '../Components/Hematology/ViewForm';
import BloodChemistryViewForm from '../Components/BloodChemistry/ViewForm';
import SpecialTestViewForm from '../Components/SpecialTestLabResult/ViewForm';
import MiscellaneousViewForm from '../Components/MiscLabResult/ViewForm';
import DiagnosisAndRecommendationForm from '../Components/DiagnosisAndRecommendationForm.vue';
import ErrorAlert from "../Components/Alerts/Error";
import SuccessAlert from "../Components/Alerts/Success";
import LabTestTab from '../Components/LabTestTab';

const TABS = [{
    title: 'Solid',
    value: 'tab1',
  }, {
    title: 'Outline',
    value: 'tab2',
  }, {
    title: 'Outline 2x',
    value: 'tab3',
  }, {
    title: 'Dashed',
    value: 'tab4',
  }];


export default {
  components: {
    FormWizard,
    TabContent,
    Tabs,
    'vue-ladda': VueLadda,
    WizardOtherInfo,
    WizardPrescription,
    WizardTreatmentHistory,
    WizardPrescriptionHistory,
    FecalysisViewForm,
    UrinalysisViewForm,
    HematologyViewForm,
    BloodChemistryViewForm,
    SpecialTestViewForm,
    MiscellaneousViewForm,
    DiagnosisAndRecommendationForm,
    LabTestTab,
    ErrorAlert,
    SuccessAlert
  },
  props: ['value', 'user_id', 'check_up_id'],
  data: () => ({
    moment: moment,
    heading: 'Pills Buttons',
    subheading: 'The pills buttons from ArchitectUI have 100% rounded corners.',
    icon: 'pe-7s-bluetooth icon-gradient bg-deep-blue',

    tabs: TABS,
    currentTab: 'tab1',

    buttons: [
      {
        loading: false,
        'dataStyle': 'expand-left',
        progress: 0,
      },
      {
        loading: false,
        'dataStyle': 'expand-right',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'zoom-in',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'zoom-out',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'slide-left',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'slide-right',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'slide-up',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'slide-down',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'expand-up',
        progress: 0
      },
      {
        loading: false,
        'dataStyle': 'expand-down',
        progress: 0
      },
    ],
    selected: [], // Must be an array reference!
    selected2: 'fecalysis',
    local_user_id: 0,
    local_check_up_id: 0,
    cashier_id: 0,
    prescribedMedicines: [],
    sum_price: 0,
    sum_quantity: 0,
    sum_total_price: 0,
    diagnosis: '',
    recommendation: '',
    isErrorDialog: false,
    errors: [],
    success_message: '',
    isSuccessDialog: false,
    isLoading: false,
    age: 0,
    first_name: '',
    fecalysisCounter: 0,
    urinalysisCounter: 0,
    hematologyCounter: 0,
    bloodChemistryCounter: 0,
    specialTestCounter: 0,
    miscellaneousCounter: 0
  }),
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    getSelectedLabTab(lab){
      this.selected2 = lab;
    },
    submit: function (button) {
      const duration = 2000;
      button.loading = true;
      updateButtonProgress(duration, button);
      setTimeout(function () {
        button.loading = false;
      }, duration);
    },
    async treatCheckUp(){
      await axios.put('api/check_ups/'+this.local_check_up_id, {
        status: 'T',
        diagnosis: this.diagnosis,
        recommendation: this.recommendation
      })
      .then((res) => {
        this.removeFromQueue();
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
    removeFromQueue(){
      axios.put('api/users/'+this.local_user_id, {
        is_queue: 0,
        last_appointment: moment().format("YYYY-MM-DD")
      })
      .then((res) => {
          this.age = res.data.age;
          this.first_name = res.data.first_name;
          //this.insertPatientDiagnosis();
          this.success_message = this.first_name+" has been treated successfully";
          this.isSuccessDialog = true;
          this.$emit("treated");
          this.isLoading = false;

          /*if (this.cashier_id) {
            window.open(localStorage.getItem("apiURL")+"/print/prescription?id="+this.cashier_id); 
          }*/
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
    doneCheckUp(){
      this.isLoading = true;

      if (this.prescribedMedicines.length) {
        axios.post('api/cashiers', {
          user_id: this.local_user_id,
          check_up_id: this.local_check_up_id,
          sum_price: this.sum_price,
          sum_quantity: this.sum_quantity,
          sum_total_price: this.sum_total_price,
          has_receipt: 1
        })
        .then((res) => {
          this.cashier_id = res.data.id; 
          this.storePrescribedMedicines();
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
        this.treatCheckUp();
      }
    },
    async storePrescribedMedicines(){
      for(let i = 0; i < this.prescribedMedicines.length; i++)  {
        await axios.post('api/cashier_medicines', {
          cashier_id: this.cashier_id,
          medicine_id: this.prescribedMedicines[i].id,
          price: this.prescribedMedicines[i].price,
          mark_up_price: 0,
          quantity: this.prescribedMedicines[i].quantity,
          days_of_use: this.prescribedMedicines[i].days_of_use,
          total_price: this.prescribedMedicines[i].total_price,
          before_breakfast: this.prescribedMedicines[i].before_breakfast,
          after_breakfast: this.prescribedMedicines[i].after_breakfast,
          before_lunch: this.prescribedMedicines[i].before_lunch,
          after_lunch: this.prescribedMedicines[i].after_lunch,
          before_dinner: this.prescribedMedicines[i].before_dinner,
          after_dinner: this.prescribedMedicines[i].after_dinner
        });

        await axios.put('api/medicine_boxes/'+this.prescribedMedicines[i].id, {
          stock: (
                    parseFloat(this.prescribedMedicines[i].available_stocks) -  
                    parseFloat(this.prescribedMedicines[i].quantity)
            )
        });  
      }

      this.treatCheckUp();
    },
    onComplete(){
      var c = confirm("Are you sure you want to save this check-up?");

      if (c) {        
        this.errors = [];
          
        if (!this.diagnosis) {
          this.errors.push("Diagnosis is required. Don't leave it blank");
          this.isErrorDialog = true;
        }

        /*for (var i = 0; i < this.prescribedMedicines.length; i++)  {
          if (!this.prescribedMedicines[i].quantity.length) {
            this.isErrorDialog = true;
            this.errors.push(this.prescribedMedicines[i].name+' should have a quantity');
          }

          if (parseFloat(this.prescribedMedicines[i].quantity) > parseFloat(this.prescribedMedicines[i].available_stocks)) {
            this.isErrorDialog = true;
            this.errors.push(this.prescribedMedicines[i].name+' should be maximum of '+this.prescribedMedicines[i].available_stocks);
          }
        }*/

        /*if (!this.recommendation) {
          this.errors.push('Recommendation is required.'); 
        }

        if (!this.prescribedMedicines.length) {
          this.errors.push('You must at least 1 medicine for patient.');  
        }*/
        if (!this.errors.length) {
          this.doneCheckUp(); 
        }  
      }
    },
    getPrescribedMedicines(medicines, sum_price, sum_quantity, sum_total_price){
      this.prescribedMedicines = medicines;
      this.sum_price = sum_price;
      this.sum_quantity = sum_quantity;
      this.sum_total_price = sum_total_price;
    },
    getDiagnosis(val){
      this.diagnosis = val;
    },
    getRecommendation(val){
      this.recommendation = val;
    }
  },
  watch: {
    user_id (val){
      this.local_user_id = val;
      this.local_check_up_id = this.check_up_id;

      this.$refs.checkUpWizard.reset();
      this.cashier_id = 0;
      this.prescribedMedicines= [];
      this.sum_price = 0;
      this.sum_quantity = 0;
      this.sum_total_price = 0;
      this.diagnosis = '';
      this.recommendation= '';
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
