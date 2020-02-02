<template>
<div>
  <v-dialog :value="value" persistent max-width="600px">
    <div class="add-diagnosis-dialog">
      <v-card v-show="!isLoading">
        <v-card-title>
        <span class="headline">Add Medicine</span>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <h6 class="text-primary" v-show="generic.id">You select {{ generic.name }}</h6>
            <generic-autocomplete v-on:generic-selected="getGeneric"></generic-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Brand Name *" required v-model="brand_name"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-select 
              :items="medicineMaterials" 
              label="Material *" 
              required
              item-text="name"
              item-value="code"
              v-model="material"
            >
            </v-select>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="insertMedicine">Add New Medicine</v-btn>
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
import GenericAutocomplete from '../Generic/Autocomplete';

export default {
  components: {
    GenericAutocomplete,
    SuccessAlert,
    ErrorAlert
  },
  props: ['value'],
  data: () => ({
    isLoading: false,
    isSuccessAlert: false,
    isErrorAlert: false,
    success_message: '',
    errors: [],
    brand_name: '',
    generic: {},
    medicineMaterials:[{code: 'T', name: 'Tablet'},{code: 'S', name: 'Syrup'}],
    material: 'T'
  }),
  methods: {
    insertMedicine() {
      if (!this.generic || !this.generic.id) {
        this.isErrorAlert = true;
        this.errors = [];
        this.errors.push("Error: Please select a generic");
      } else {
        this.isLoading = true;

        axios.post('/api/medicines',{
          name: this.brand_name,
          generic_id: this.generic.id,
          price: 0,
          mark_up_price: 0,
          material: this.material
        })
        .then((res) => {
          this.isLoading = false;
          this.$emit('input');
          this.isSuccessAlert = true;
          this.success_message = "Medicine inserted successfully";
          this.$emit('list-updated');
          
          this.brand_name = "";
          this.generic = {};
          this.material = "T";
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
    getGeneric(gen){
      console.log('generic is ..... '+gen);
      this.generic = gen;
    }
  },
  watch: {
    user_id (val) {
      console.log('user_id', val);
      // this.local_user_id = val;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
