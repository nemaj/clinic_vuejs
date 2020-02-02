<template>
<div>
  <v-dialog :value="value" persistent max-width="600px">
    <div class="add-diagnosis-dialog">
      <v-card v-show="!isLoading">
        <v-card-title>
        <span class="headline">Edit Generic {{ local_medicine.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-text-field label="Generic Name *" required v-model="newGenericName"></v-text-field>
          </v-flex>
          <h6 class="text-primary">Current Stock: 
          {{ Math.round(parseFloat(local_medicine.available_stocks)).toLocaleString() }}
          </h6>
          <v-flex xs12>
            <v-text-field label="Stocks to add" v-model="stock" @keypress="isNumber($event)">
            </v-text-field>
          </v-flex>
          <h6 class="text-primary">New Total Stock: 
          {{ Math.round(parseFloat(newTotalStocks)).toLocaleString() }}
          </h6>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="updateMedicine">Save</v-btn>
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
  props: ['value', 'generic'],
  data: () => ({
    isLoading: false,
    isSuccessAlert: false,
    isErrorAlert: false,
    success_message: '',
    errors: [],
    local_medicine: {},
    stock: 0,
    newGenericName: ''
  }),
  methods: {
    updateMedicine() {
      if (!this.stock.length) {
        this.isErrorAlert = true;
        this.errors = [];
        this.errors.push("Stock field is required");
      } else {      
        this.isLoading = true;

        if (this.newGenericName == this.local_medicine.name) {
          this.updateMedicineBox();
        } else {//update name too
          axios.put('/api/medicines/'+this.local_medicine.id,{
            name: this.newGenericName,
          })
          .then((res) => {
            if (!this.isErrorAlert) {
              this.updateGeneric(); 
            }
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
        } 
      }
    },
    updateGeneric(){
      axios.put('/api/generics/'+this.local_medicine.generic.id,{
        name: this.newGenericName,
      })
      .then((res) => {
        this.updateMedicineBox();
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
    updateMedicineBox(){
      axios.put('/api/medicine_boxes/'+this.local_medicine.medicine_boxes[0].id,{
        stock: this.newTotalStocks
      })
      .then((res) => {
        this.doneUpdate();
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
    doneUpdate(){
      this.isLoading = false;
      this.$emit('input');
      this.isSuccessAlert = true;
      this.success_message = "Generic updated successfully";
      this.$emit('list-updated');
      this.stock = 0;
    },
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
    }
  },
  watch: {
    generic(val) {
      this.local_medicine = val;
      this.newGenericName = this.local_medicine.name;
    }
  },
  computed: {
    newTotalStocks(){
      return parseFloat(this.stock) + parseFloat(this.local_medicine.available_stocks);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
