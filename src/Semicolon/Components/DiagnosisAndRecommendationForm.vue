<template>
<div class="diagnosis-form">
  <v-card>
    <v-card-title>
      <span class="headline">
        Diagnosis And Recommendation
      </span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-layout wrap>
          
            <v-flex xs12>
              <label>Diagnosis*</label>
              <v-textarea solo rows="3" v-model="diagnosis"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <label>Recommendation*</label>
              <v-textarea solo rows="3" v-model="recommendation"></v-textarea>
            </v-flex>

            <small class="text-danger">*Indicates required field</small>
      
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
//import DiagnosisAutocomplete from './Diagnosis/Autocomplete';

export default {
  /*components: {
    DiagnosisAutocomplete
  },*/
  data: () => ({
    diagnosis: '',
    recommendation: '',
    rules: {required: value => !!value || 'Required.'}
  }),
  watch: {
    diagnosis(val) {
      this.$emit('diagnosed', val);
    },
    recommendation(val){
      this.$emit('recommended', val);
    }
  }
}
</script>

<style lang="scss" scoped>
  .diagnosis-form {
    .v-card__title {
      display: flex;
      > span {
        flex-grow: 1;
      }
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