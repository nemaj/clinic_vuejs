<template>
<b-table
      :striped="striped"
      :bordered="bordered"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :items="local_cashier_medicines"
      :fields="fields"
      responsive>

      <template v-slot:cell(quantity)="data">
        {{ Math.round(parseFloat(data.item.quantity)).toLocaleString() }}
      </template>
      <!-- <template v-slot:cell(usage)="data">
        <div class="usage-div">
          <div class="usage-forms">
            <label>Breakfast</label>
            <div class="split">
              <b-form-input
                v-model="data.item.before_breakfast"
                disabled="true"
                placeholder="Before"
              ></b-form-input>

              <b-form-input
                v-model="data.item.after_breakfast"
                disabled="true"
                placeholder="After"
              ></b-form-input>
            </div>
          </div>
          <div class="usage-forms">
            <label>Lunch</label>
            <div class="split">
              <b-form-input
                v-model="data.item.before_lunch"
                disabled="true"
                placeholder="Before"
              ></b-form-input>

              <b-form-input
                v-model="data.item.after_lunch"
                disabled="true"
                placeholder="After"
              ></b-form-input>
            </div>
          </div>
          <div class="usage-forms">
            <label>Dinner</label>
            <div class="split">
              <b-form-input
                v-model="data.item.before_dinner"
                disabled="true"
                placeholder="Before"
              ></b-form-input>

              <b-form-input
                v-model="data.item.after_dinner"
                disabled="true"
                placeholder="After"
              ></b-form-input>
            </div>
          </div>
        </div>
      </template> -->
</b-table>
</template>
<script>
export default {
	props: ['cashier_medicines'],
	data: () => ({
		local_cashier_medicines: [],
		fields: [
      		{ key: 'medicine.generic.name', label: 'Generic'},
      		// { key: 'medicine.name', label: 'Medicine Brand'},
          // { key: 'Usage', tdClass: 'custom-forms usage' },
          // { key: 'days_of_use', label: 'Days of Use'},
      		'quantity'
    	],
	    striped: false,
	    bordered: false,
	    outlined: false,
	    small: false,
	    hover: true,
	    dark: false,
	    fixed: false,
	    footClone: false
	}),
	mounted(){
		this.local_cashier_medicines = this.cashier_medicines;
	},
	watch: {
		cashier_medicines(val) {
			this.local_cashier_medicines = 	val;
		}
	}
}
</script>
<style lang="scss" scoped>
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
</style>
