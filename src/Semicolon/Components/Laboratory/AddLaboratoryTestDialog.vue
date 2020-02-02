<template>
   <v-dialog :value="value" persistent max-width="992px">
    <div class="add-lab-test-form">
       <v-card>
         <!-- <v-card-text class="heads">
          <div class="modal-head">
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              class="mx-3 search-box"
              flat
              hide-no-data
              hide-details
              :label="label"
              solo-inverted
              item-text="name"
              item-value="id"
              return-object
              append-icon="search"
            ></v-autocomplete>
          </div>
         </v-card-text> -->
         <v-container>
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
                 <add-fecalysis v-if="selected2 == 'fecalysis'" :user_id="local_user_id" :key="local_user_id">
                 </add-fecalysis>
                 <add-urinalysis v-if="selected2 == 'urinalysis'" :user_id="local_user_id" :key="local_user_id">
                 </add-urinalysis>
                 <add-hematology v-if="selected2 == 'hematology'" :user_id="local_user_id" :key="local_user_id">
                 </add-hematology>
                 <add-blood-chemistry v-if="selected2 == 'blood-chemistry'" :user_id="local_user_id" :key="local_user_id">
                 </add-blood-chemistry>
                 <add-special-test v-if="selected2 == 'special-test'" :user_id="local_user_id" :key="local_user_id">
                 </add-special-test>
                 <add-miscellaneous v-if="selected2 == 'miscellaneous'" :user_id="local_user_id" :key="local_user_id">
                 </add-miscellaneous>
             </div>
           </v-card-text>
         </v-container>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
         </v-card-actions>
       </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import Tabs from 'vue-tabs-with-active-line';
import VueLadda from '../../../assets/components/ladda-loading/src/vue-ladda';
import AddFecalysis from "../../Components/Fecalysis/AddEditDialog";
import AddUrinalysis from "../../Components/Urinalysis/AddEditDialog";
import AddHematology from "../../Components/Hematology/AddEditDialog";
import AddBloodChemistry from "../../Components/BloodChemistry/AddEditDialog";
import AddSpecialTest from "../../Components/SpecialTestLabResult/AddEditDialog";
import AddMiscellaneous from "../../Components/MiscLabResult/AddEditDialog";

export default {
  components: {
    FormWizard,
    TabContent,
    Tabs,
    'vue-ladda': VueLadda,
    AddFecalysis,
    AddUrinalysis,
    AddHematology,
    AddBloodChemistry,
    AddSpecialTest,
    AddMiscellaneous
  },
  props: ['value', 'user_id'],
  data: () => ({
    currentTab: 'tab1',
    local_user_id: 0,

    selected2: 'fecalysis',
    options2: [
      {text: 'Fecalysis', value: 'fecalysis'},
      {text: 'Urinalysis', value: 'urinalysis'},
      {text: 'Hematology', value: 'hematology'},
      {text: 'Blood Chemistry', value: 'blood-chemistry'},
      {text: 'Special Test', value: 'special-test'},
      {text: 'Miscellaneous', value: 'miscellaneous'}
    ],

    loading: false,
    isErrorDialog: false,
    error_message: '',
    items: [],
    search: null,
    select: null,
    label: 'Search name',
    local_generic: {id: 0, name: 'Search from all generics'}
  }),
  watch:{
    value(val) {
      this.local_user_id = this.user_id;
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
  .add-lab-test-form {
    .heads {
      padding-bottom: 0;
      .modal-head {
        text-align: right;
        display: flex;
        justify-content: flex-end;
        .search-box {
          max-width: 250px;
        }
      }
    }
    .contents {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
</style>
