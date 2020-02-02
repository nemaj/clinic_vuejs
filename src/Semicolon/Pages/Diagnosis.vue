<template>
  <div class="add-diagnosis">
    <page-title :heading="heading" :subheading="subheading" :icon="icon" v-on:add-dialog="openAddDiagnosisDialog = true">
    </page-title>

    <diagnosis-analytics :reload="reloadTable"></diagnosis-analytics>

    <add-diagnosis-dialog v-model="openAddDiagnosisDialog" v-on:list-updated="reloadTable = true">
    </add-diagnosis-dialog>

    <success-alert v-model="isSuccessAlert">{{ success_message }}</success-alert>
    <error-alert v-model="isErrorAlert" :errors="errors"></error-alert>
  </div>
</template>
<script>
import { axios } from '@/plugins/axios';
import PageTitle from "../Components/Diagnosis/Header.vue";
import DiagnosisAnalytics from "../Components/Diagnosis/Analytics";
import AddDiagnosisDialog from '../Components/Diagnosis/AddDialog.vue';
import SuccessAlert from '../Components/Alerts/Success';
import ErrorAlert from '../Components/Alerts/Error';

export default {
  components: {
    PageTitle,
    DiagnosisAnalytics,
    AddDiagnosisDialog,
    SuccessAlert,
    ErrorAlert
  },
  data: () => ({
    heading: "Diagnosis",
    subheading: '',
    icon: 'pe-7s-plus icon-gradient bg-happy-itmeo',
    isLoading: false,
    success_message: '',
    isSuccessAlert: false,
    isErrorAlert:false,
    errors: [],
    openAddDiagnosisDialog: false,
    reloadTable: false
  })
}
</script>
<style lang="scss" scoped>
  .add-diagnosis {
    .table-div > .table-responsive {
      min-height: 300px;
    }
  }
</style>