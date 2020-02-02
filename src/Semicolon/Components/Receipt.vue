<template>
<div>
<v-dialog :value="value" @input="$emit('input')" persistent max-width="600px">
	<v-card class="text-primary">
		<v-card-title>
      <span class="headline">Receipt No. 1235</span>
    </v-card-title>
    <v-card-text>
<div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">
                      <div class="media-body">
                        <a href="javascript:void(0)">Allie Rodriguez</a>
                      </div>
                      <div>
                          Date Today  
                      </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Medicine</th>
                                <th>Usage</th>
                                <th class="text-center">Quantity</th>
                                <th class="text-center">Price</th>
                                <th class="text-center">Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                  <font-awesome-icon icon="tint" title="Syrup"></font-awesome-icon>
                                  Neozep
                                </td>
                                <td style="word-wrap:break-word; width:100px;">Sipon Lorem ipsum 1234567890</td>
                                <td class="text-center">
                                  1
                                </td>
                                <td class="text-center">
                                    100
                                </td>
                                <td class="text-center">
                                    100000
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-right card-footer">
                      <span class="text-muted d-inline-flex align-items-center align-middle">
                        <strong class="text-primary"><i>TOTAL:</i></strong>&nbsp;
                        <span class="align-middle">P 48.00</span>
                    </span>
                    
                        <!--button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger">
                          <i class="pe-7s-trash btn-icon-wrapper"></i>
                        </button>
                        <button class="btn-wide btn btn-success">Save</button-->
                    </div>
                </div>
            </div>
        </div>
        
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="darken-1" flat @click.native="$emit('input')">Close</v-btn>
      <v-btn color="green darken-1" flat @click.native="$emit('input')">Generate Receipt</v-btn>
    </v-card-actions>
	</v-card>
</v-dialog>    
</div>
</template>
<script>

export default {
	props: ['value']
  /*data: () => ({
    local_medicine_id: 0,
    cashier_medicines: []
  }),
  methods: {
    getCashierMedicines(){
      axios.get('api/cashier_medicines/'+this.local_medicine_id)
      .then((res) => {
        this.cashier_medicines = res.data.data
      })
      .catch((error) => {

      });
    }
  },
  watch: {
    medicine_id: function (val) {
      this.local_medicine_id = val;
    }
  }*/
}
</script>