<template>
<div>
  <v-dialog :value="value" persistent max-width="600px">
    <div class="add-diagnosis-dialog">
      <v-card v-show="!isLoading">
        <v-card-title>
        <span class="headline">Edit Diagnosis</span>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-text-field label="Diagnosis*" required v-model="local_diagnosis.name"></v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="updateDiagnosis">Save</v-btn>
        </v-card-actions>
      </v-card>
      <div class="text-center" v-show="isLoading">
        <img src="@/assets/images/loading.gif" class="img-fluid" />
      </div>
    </div>
  </v-dialog>

  <success-alert v-model="isSuccessAlert">{{ success_message }}</success-alert>
  <error-alert v-model="isErrorAlert" :errors="errors"></error-alert>
</div>
</template>
<script>
import { axios } from '@/plugins/axios';
import SuccessAlert from '../Alerts/Success';
import ErrorAlert from '../Alerts/Error';

export default {
  components: {
    SuccessAlert,
    ErrorAlert
  },
  props: ['value', 'diagnosis'],
  data: () => ({
    isErrorAlert: false,
    isSuccessAlert: false,
    success_message: '',
    errors: [],
    isLoading: false,
    local_diagnosis: {}
  }),
  methods: {
    updateDiagnosis() {
      this.isLoading = true;

      axios.put('/api/diagnoses/'+this.local_diagnosis.id,{
        name: this.local_diagnosis.name
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessAlert = true;
        this.success_message = res.data.name+" updated successfully";
        this.$emit('list-updated');
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
    }
  },
  watch: {
    diagnosis (val) {
      this.local_diagnosis = val;
    }
  }
}
</script>