<template>
  <div class="wizard-prescription">
    <v-card>
      <v-card-text>
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
              <i class="pe-7s-attention attention-icon text-danger" v-show="parseFloat(data.item.quantity) > parseFloat(data.item.available_stocks)">
              </i>
              <span class="text-danger" v-show="parseFloat(data.item.quantity) > (data.item.available_stocks)">
                Error! Maximum {{ data.item.available_stocks }} only
              </span>
            </label>
          </template>
          <template v-slot:cell(quantity)="data">
            <b-form-input
              v-model="data.item.quantity"
              @keyup="updateTotalQty(data.index)"
              @keypress="isNumber(data.index, $event)"
            ></b-form-input>
          </template>

          <template v-slot:cell(delete)="data">
              <v-btn x-small color="red" dark @click="deleteMedicine(data.index)">X</v-btn>
          </template>

        </b-table>
        <!-- <div class="text-right">
          <span>
            <b class="mr-2">Total: </b> 100
          </span>
        </div> -->

      </v-card-text>
    </v-card>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </div>
</template>

<script>
import MedicineAutocomplete from '../Medicine/Autocomplete';
import FindMedicine from '../Medicine/FindMedicine';
import ErrorAlert from "../Alerts/Error.vue";

export default {
  components: {
    MedicineAutocomplete,
    FindMedicine,
    ErrorAlert
  },
  data: () => ({
    heading: "Check-up",
    isErrorDialog: false,
    errors: [],
    fields: [
      'name',
      'quantity',
      'delete'
    ],
    items: [],
    striped: false,
    bordered: false,
    outlined: false,
    small: false,
    hover: true,
    dark: false,
    fixed: false,
    footClone: false,
    filter: '',
    generic: {}
  }),
  methods: {
    isNumber(index, $event) {
// console.log($event.keyCode); //keyCodes value
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

       // only allow number and one dot
       if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.items[index].quantity.toString().indexOf('.') != -1)) { // 46 is dot
          $event.preventDefault();
       }

       // restrict to 2 decimal places
       if(this.items[index].quantity!=null && this.items[index].quantity.toString().indexOf(".")>-1 && (this.items[index].quantity.toString().split('.')[1].length > 1)){
          $event.preventDefault();
       }
    },
    updateTotalQty(index){
      this.$emit('prescribe', this.items, this.sum_price, this.sum_quantity, this.sum_total_price);
    },
    updateSubTotal(index){
      if (this.items[index].quantity.length == 0) {
        //set quantity to 0
        this.items[index].quantity = 0;

        var totalPrice =

        parseFloat(this.items[index].quantity) * parseFloat(this.items[index].price);

        this.items[index].total_price = parseFloat(totalPrice).toFixed(2);
      } else {
        var totalPrice =

        parseFloat(this.items[index].quantity) * parseFloat(this.items[index].price);

        this.items[index].total_price = parseFloat(totalPrice).toFixed(2);
      }

      this.$emit('prescribe', this.items, this.sum_price, this.sum_quantity, this.sum_total_price);
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
            this.items.push({
              id: medicineObj.id,
              generic_id: medicineObj.generic.id,
              name: medicineObj.generic.name,
              brand: medicineObj.name,
              before_breakfast: 0,
              after_breakfast: 0,
              before_lunch: 0,
              after_lunch: 0,
              before_dinner: 0,
              after_dinner: 0,
              days_of_use: 0,
              quantity: 0,
              price: medicineObj.price,
              total_price: medicineObj.price,
              available_stocks: medicineObj.available_stocks
            });
          }
        }
      }
    },
    deleteMedicine(index){
      this.items.splice(index, 1);
    }
  },
  watch:{
    items(val) {
      this.$emit('prescribe', val, this.sum_price, this.sum_quantity, this.sum_total_price);
    }
  },
  computed: {
    sum_price: function(){
      return this.items.reduce(function(sum_price, cashier_pharmacy){
        return sum_price + Number(cashier_pharmacy.price);
      }, 0);
    },
    sum_quantity() {
      return this.items.reduce((sum_quantity, cashier_pharmacy) => {
        return sum_quantity + Number(cashier_pharmacy.quantity);
      }, 0);
    },
    sum_total_price() {
      return this.items.reduce((sum_total_price, cashier_pharmacy) => {
        return sum_total_price + Number(cashier_pharmacy.total_price);
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
