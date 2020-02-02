<template>
 <v-dialog :value="open" persistent max-width="1100px">
    <v-card>
      <v-card-text>
        <v-container>
          <div class="text-center">
            <lab-test-tab 
              :user-id="user_id"
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
          <div class="pt-4 pb-3">
            <fecalysis-view-form 
              v-if="selected2 == 'fecalysis'" 
              :user_id="user_id" 
              v-on:seen="fecalysisCounter++"
            >
            </fecalysis-view-form>
            <urinalysis-view-form 
              v-if="selected2 == 'urinalysis'" 
              :user_id="user_id"
              v-on:seen="urinalysisCounter++"
            >
            </urinalysis-view-form>
            <hematology-view-form 
              v-if="selected2 == 'hematology'" 
              :user_id="user_id"
              v-on:seen="hematologyCounter++"
            >
            </hematology-view-form>
            <blood-chemistry-view-form 
              v-if="selected2 == 'blood-chemistry'" 
              :user_id="user_id"
              v-on:seen="bloodChemistryCounter++"
            >
            </blood-chemistry-view-form>
            <special-test-view-form 
              v-if="selected2 == 'special-test'" 
              :user_id="user_id"
              v-on:seen="specialTestCounter++"
            >
            </special-test-view-form>
            <miscellaneous-view-form 
              v-if="selected2 == 'miscellaneous'" 
              :user_id="user_id"
              v-on:seen="miscellaneousCounter++"
            >
            </miscellaneous-view-form>
          </div>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import Tabs from 'vue-tabs-with-active-line';
import VueLadda from '../../assets/components/ladda-loading/src/vue-ladda'
import WizardOtherInfo from '../Components/WizardDialog/WizardOtherInfo';
import WizardPrescription from '../Components/WizardDialog/WizardPrescription';
import WizardPrescriptionHistory from '../Components/WizardDialog/WizardPrescriptionHistory';
import FecalysisViewForm from '../Components/Fecalysis/ViewForm';
import UrinalysisViewForm from '../Components/Urinalysis//ViewForm';
import HematologyViewForm from '../Components/Hematology/ViewForm';
import BloodChemistryViewForm from '../Components/BloodChemistry/ViewForm';
import SpecialTestViewForm from '../Components/SpecialTestLabResult/ViewForm';
import MiscellaneousViewForm from '../Components/MiscLabResult/ViewForm';
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
    WizardPrescriptionHistory,
    FecalysisViewForm,
    UrinalysisViewForm,
    HematologyViewForm,
    BloodChemistryViewForm,
    SpecialTestViewForm,
    MiscellaneousViewForm,
    LabTestTab
  },
  props: ['open', 'user_id'],
  data: () => ({
    heading: 'Pills Buttons',
    subheading: 'The pills buttons from ArchitectUI have 100% rounded corners.',
    icon: 'pe-7s-bluetooth icon-gradient bg-deep-blue',
    tabs: TABS,
    currentTab: 'tab1',
    selected2: 'fecalysis',
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
