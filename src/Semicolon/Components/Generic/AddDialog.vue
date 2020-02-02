<template>
<div>
  <v-dialog :value="value" persistent max-width="600px">
    <div class="add-diagnosis-dialog">
      <v-card v-show="!isLoading">
        <v-card-title>
        <span class="headline">Add Generic</span>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-text-field label="Generic Name *" required v-model="generic_name"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Stock" v-model="stock" @keypress="isNumber($event)">
            </v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="insertGeneric">Save</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-show="isLoading">
        <v-flex xs12>
          <img src="@/assets/images/loading.gif" class="img-fluid" />
        </v-flex>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
        </v-card-actions>
      </v-card>
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
  props: ['value'],
  data: () => ({
    isLoading: false,
    isSuccessAlert: false,
    isErrorAlert: false,
    success_message: '',
    errors: [],
    generic_name: '',
    stock: 0
  }),
  methods: {
    isNumber($event) {
// console.log($event.keyCode); //keyCodes value
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

       // only allow number and one dot
       if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.stock.toString().indexOf('.') != -1)) { // 46 is dot
          $event.preventDefault();
       }

       // restrict to 2 decimal places
       if(this.stock!=null && this.stock.toString().indexOf(".")>-1 && (this.stock.toString().split('.')[1].length > 1)){
          $event.preventDefault();
       }
    },
    insertGeneric() {
      this.isLoading = true;

      axios.post('/api/generics',{
        name: this.generic_name,
      })
      .then((res) => {
        this.insertMedicine(res.data.id);
      })
      .catch((error) => {
          this.isLoading = false;
          this.isErrorAlert = true;
          this.errors = [];
          this.errors.push(error);

          if (error.response.data.errors !== undefined) {
            Object.entries(error.response.data.errors).forEach(
                ([key, value]) => this.errors.push(value.toString())
            );
          }
      });
    },
    insertMedicine(genericID){
      axios.post('/api/medicines',{
          name: this.generic_name,
          generic_id: genericID,
          price: 0,
          mark_up_price: 0,
          material: 'T'
      })
      .then((res) => {
        this.insertMedicineBox(res.data.id);
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
    },
    insertMedicineBox(medicineID){
      axios.post('/api/medicine_boxes',{
        medicine_id: medicineID,
        batch_no:1,
        stock: (this.stock ? this.stock : 0),
        expiry: '2100-01-01'
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessAlert = true;
        this.success_message = "Generic inserted successfully";
        this.$emit('list-updated');

        this.generic_name = "";
        this.stock = 0;
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
  }
}
</script>
<style lang="scss" scoped>
</style>
