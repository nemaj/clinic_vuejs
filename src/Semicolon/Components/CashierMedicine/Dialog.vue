<template>
<div>
<v-dialog max-width="800" :value="value" @input="$emit('input')">
<v-card>
  <v-card-title v-show="!isLoading">
    <span class="headline">
      Today's Prescription for {{ lastName }}
    </span>
  </v-card-title>
  <v-card-text v-show="!isLoading">
    <div>
      <v-layout wrap>
        <v-flex xs12>
          <find-medicine :generic="generic" v-on:medicine-selected="addMedicine"></find-medicine>
        </v-flex>
        <!-- <v-flex xs12>
          <medicine-autocomplete :generic="generic" v-on:medicine-selected="addMedicine">
          </medicine-autocomplete>
        </v-flex> -->
      </v-layout>
      <b-table
        :striped="striped"
        :bordered="bordered"
        :outlined="outlined"
        :small="small"
        :hover="hover"
        :dark="dark"
        :fixed="fixed"
        :foot-clone="footClone"
        :items="items"
        :fields="fields"
        responsive>

        <template v-slot:cell(name)="data">
          <label>
            {{ data.item.name }}
            <i class="pe-7s-attention attention-icon text-danger" v-show="parseInt(data.item.before_lunch) > parseInt(data.item.available_stocks)">
            </i>
            <span class="text-danger" v-show="parseInt(data.item.before_lunch) > (data.item.available_stocks)">
              Error! Maximum {{ Math.round(parseInt(data.item.available_stocks)).toLocaleString() }} only
            </span>
          </label>
        </template>

        <template v-slot:cell(available_stocks)="data">
          {{ Math.round(parseInt(data.item.available_stocks)).toLocaleString() }}
        </template>

        <template v-slot:cell(quantity)="data">
          {{ Math.round(parseInt(data.item.quantity)).toLocaleString() }}
        </template>

        <template v-slot:cell(before_lunch)="data">
          <b-form-input
            v-model="data.item.before_lunch"
            @keyup="updateTotalQty(data.index)"
            @keypress="isNumber(data.index, $event)"
          ></b-form-input>
        </template>

        <template v-slot:cell(after_lunch)="data">
          {{ Math.round(parseInt(data.item.after_lunch)).toLocaleString() }}
        </template>

        <template v-slot:cell(delete)="data">
            <v-btn x-small color="red" dark @click="deleteMedicine(data.index)" v-show="!data.item.before_dinner">X</v-btn>
        </template>

      </b-table>
      <!--div class="alert alert-info">
        <strong>Total: </strong> {{ sum_quantity }}
      </div-->
    </div>
  </v-card-text>
  <v-card-text v-show="isLoading">  
    <div class="text-center">
      <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 50%" />
    </div>
  </v-card-text>
  <v-card-actions v-show="!isLoading">
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
    <button type="button" class="btn-shadow mr-3 btn btn-primary" title="Print Today's Prescription" v-show="hasRecordToday" @click="print">
      <font-awesome-icon icon="print" />
    </button>
    <v-btn color="blue darken-1" flat @click="insertPrescription">
    Give Medicines
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>

<error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
<success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
</div>
</template>

<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import MedicineAutocomplete from '../Medicine/Autocomplete';
import FindMedicine from '../Medicine/FindMedicine';
import ErrorAlert from "../Alerts/Error.vue";
import SuccessAlert from "../Alerts/Success.vue";

export default {
  components: {
    MedicineAutocomplete,
    FindMedicine,
    ErrorAlert,
    SuccessAlert
  },
  props: ['value', 'user_id', 'lastName'],
  data: () => ({
    isErrorDialog: false,
    isSuccessDialog: false,
    success_message: '',
    errors: [],
    fields: [
      //{key: 'medicine_id', label:'Generic ID'},
      {key: 'medicine_name', label: 'Name'},
      'available_stocks',
      {key: 'quantity',  label: 'Given Today'},
      {key: 'before_lunch', label: 'Quantity to Give'},
      {key: 'after_lunch', label: 'Quantity'},
      'delete'
    ],
    items: [],
    cashier_medicines:[],
    striped: false,
    bordered: false,
    outlined: false,
    small: false,
    hover: true,
    dark: false,
    fixed: false,
    footClone: false,
    isLoading: false,
    filter: '',
    generic: {},
    cashier_id: 0,
    local_user_id: 0,
    hasRecordToday: false
  }),
  methods: {
    isNumber(index, $event) {
// console.log($event.keyCode); //keyCodes value
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

       // only allow number and one dot
       if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.items[index].will_give_quantity.toString().indexOf('.') != -1)) { // 46 is dot
          $event.preventDefault();
       }

       // restrict to 2 decimal places
       if(this.items[index].will_give_quantity != null && this.items[index].will_give_quantity.toString().indexOf(".") > -1 && (this.items[index].will_give_quantity.toString().split('.')[1].length > 1)){
          $event.preventDefault();
       }
    },
    updateTotalQty(index){
      var qty = (
          parseInt(this.items[index].quantity) + parseInt(this.items[index].before_lunch)
      );

      this.items[index].after_lunch = parseInt(qty);
    },
    onFiltered() {
      console.log('empty function');
    },
    clearFilter() {
      console.log('empty function');
    },
    setSearchFromGeneric(genericObj){
      this.generic = genericObj;
    },
    addMedicine(medicineObj) {
      console.log(medicineObj);

      if (medicineObj) {
        if (medicineObj.available_stocks == 0) {
          this.isErrorDialog = true;
          this.errors = [];
          this.errors.push('Error: Cannot add '+medicineObj.name+' because it has no stock');
        } else {//check if exists on list or not
          var exists = false;

          for (var i = 0; i < this.items.length; i++) {
            if (medicineObj.id == this.items[i].id) {
              exists = true;
              this.isErrorDialog = true;
              this.errors = [];
              this.errors.push('Error: '+this.items[i].brand+' already exists. Just use the '+this.items[i].brand+' which is in the table');
              break;
            }
          }

          if (!exists) {
            console.log(medicineObj);
            this.items.push({
              medicine_id: medicineObj.id,
              /*generic_id: medicineObj.generic.id,*/
              medicine_name: medicineObj.generic.name,
              /*brand: medicineObj.name,*/
              quantity: 0,
              before_lunch: 1,
              after_lunch: 1,
              before_dinner: 0,
              available_stocks: medicineObj.available_stocks
            });
          }
        }
      }
    },
    deleteMedicine(index){
      this.items.splice(index, 1);
    },
    insertPrescription(){
      this.errors = [];

      if (!this.items.length) {
        this.isErrorDialog = true;
        this.errors.push('You must have a medicine');
      }

      for (var i = 0; i < this.items.length; i++)  {
        if ((!this.items[i].before_lunch || this.items[i].before_lunch == 0) && !this.items[i].before_dinner) {//new data not from db
          this.isErrorDialog = true;
          this.errors.push(this.items[i].medicine_name+' should have a quantity');
        }

        if (!this.items[i].before_lunch && this.items[i].before_dinner) {//from db
          this.items[i].before_lunch = 0;
        }

        if (parseInt(this.items[i].before_lunch) > parseInt(this.items[i].available_stocks)) {
          this.isErrorDialog = true;
          this.errors.push(this.items[i].medicine_name+' should be maximum of '+this.items[i].available_stocks);
        }
      }

      if (!this.errors.length) {
        var c = confirm("Once you give medicine, it will subtract generics' quantity. Do you really want to give medicines?");

        if (c) {         
          this.isLoading = true;

          if (this.hasRecordToday) {          
            axios.put('api/cashiers/'+this.cashier_id, {
              //user_id: this.local_user_id,
              sum_quantity: this.sum_quantity,
              sum_price: 0,
              sum_total_price: 0
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
            axios.post('api/cashiers', {
              user_id: this.local_user_id,
              sum_quantity: this.sum_quantity,
              sum_price: 0,
              sum_total_price: 0
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
          }  
        }
      }
    },
    async storePrescribedMedicines(){
      if (this.hasRecordToday) {//delete all cashier medicines for casher id XXX
        await axios.delete('/api/cashier_medicines/cashier_id/'+this.cashier_id);
      } 

      for(let i = 0; i < this.items.length; i++)  {
        await axios.post('api/cashier_medicines', {
          cashier_id: this.cashier_id,
          medicine_id: this.items[i].medicine_id,
          before_lunch: 0,
          quantity: this.items[i].after_lunch,
          before_dinner: 1,
          price: 0,
          mark_up_price: 0,
          days_of_use: 0,
          total_price: 0
        });

        await axios.put('api/medicine_boxes/'+this.items[i].medicine_id, {
          stock: (parseInt(this.items[i].available_stocks) - parseInt(this.items[i].before_lunch))
        });  
      }

      this.success_message = "Prescription for today saved successfully";
      this.isSuccessDialog = true;
      //this.isLoading = false;
      this.hasRecordToday = true;
      this.checkPrescriptionToday();
      this.print();
      //this.$emit('input');
    },
    checkPrescriptionToday(){
      this.isLoading = true;

      axios.get('/api/cashiers?include=cashiermedicines&filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
      .then((res) => {
        this.isLoading = false;

        if (res.data.data.length) {
          this.hasRecordToday = true;
          this.cashier_id = res.data.data[0].id;
          this.cashier_medicines = res.data.data[0].cashier_medicines;
          this.items = res.data.data[0].cashier_medicines;

          for (var i = 0; i < this.items.length; i++) {
            this.items[i].medicine_name = this.items[i].medicine.name;
            this.items[i].medicine_id = this.items[i].medicine.id;
            this.items[i].available_stocks = this.items[i].medicine.available_stocks; 
          }

          //this.sum_quantity = res.data.data[0].sum_quantity;

          console.log(this.items);
        } else {
          this.hasRecordToday = false;
          this.cashier_id = 0;
          this.cashier_medicines = [];
          this.items = [];
          //this.sum_quantity = 0;
        }
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
    print(){
      window.open(localStorage.getItem("apiURL")+"/print/prescription?id="+this.cashier_id); 
    }
  },
  watch:{
    items(val) {
      this.$emit('prescribe', val, this.sum_quantity);
    },
    user_id(val){
      this.local_user_id = val;
      this.checkPrescriptionToday();
    }
  },
  computed: {
    sum_quantity() {
      return this.items.reduce((sum_quantity, cashier_pharmacy) => {
        return sum_quantity + Number(cashier_pharmacy.after_lunch);
      }, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
  .wizard-prescription {
    margin: 0;
    margin-bottom: 30px;
    .custom-field {
      border: 1px solid rgba(26,54,126,.125);
      outline: none;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 13px;
      width: 150px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
    .actions-button {
      height: 40px;
    }
    .search-data {
      position: absolute;
      right: 15px;
      top: 20px;
      width: 300px;
      .input-group {
        width: 100%;
      }
    }
    .usage-div {
      display: flex;
      .usage-forms {
        text-align: center;
        label {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 3px;
        }
        .split {
          display: flex;
          margin-bottom: 5px;
          margin-right: 5px;
        }
        input {
          margin-bottom: 5px;
          font-size: 12px;
        }
      }
    }
  }
</style>