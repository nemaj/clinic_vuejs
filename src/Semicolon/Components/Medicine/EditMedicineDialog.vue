<template>
<div>

  <v-dialog :value="value" persistent max-width="600px">
    <div class="add-diagnosis-dialog">
      <v-card v-show="!isLoading">
        <v-card-title>
        <span class="headline">Edit Medicine Info No. {{ local_medicine_id }}</span>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <h6 class="text-primary" v-show="generic.id">Generic: {{ generic.name }}</h6>
            <generic-autocomplete v-on:generic-selected="getGeneric" :generic="generic">
            </generic-autocomplete>
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
          <v-btn color="blue darken-1" flat @click="saveMedicine">Save</v-btn>
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
    SuccessAlert,
    ErrorAlert,
    GenericAutocomplete
  },
  props: ['value', 'medicine_id'],
  data: () => ({
    local_medicine_id: 0,
    isLoading: false,
    isSuccessAlert: false,
    isErrorAlert: false,
    errors: [],
    success_message: '',
    generic: {},
    brand_name: '',
    material: 'T',
    medicineMaterials:[{code: 'T', name: 'Tablet'},{code: 'S', name: 'Syrup'}]
  }),
  methods: {
    getMedicine(){
      this.isLoading = true;

      axios.get('/api/medicines/'+this.local_medicine_id)
      .then((res) => {
        this.isLoading = false;
        this.generic = {id: res.data.generic.id, name: res.data.generic.name};
        this.brand_name = res.data.name;
        this.material = res.data.material;
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
    saveMedicine() {
      if (!this.generic || !this.generic.id) {
        this.isErrorAlert = true;
        this.errors = [];
        this.errors.push("Error: Please select a generic");
      } else {
        this.isLoading = true;

        axios.put('/api/medicines/'+this.local_medicine_id,{
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
          this.success_message = res.data.name+" updated successfully";
          this.$emit('list-updated');
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
    getGeneric(gen){
      console.log('generic is ..... '+gen);
      this.generic = gen;
    }
  },
  watch: {
    medicine_id (val) {
      this.local_medicine_id = val;
      this.getMedicine();
    }
  }
}
</script>