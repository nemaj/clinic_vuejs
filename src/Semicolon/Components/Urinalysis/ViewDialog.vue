<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ created_at }} Urinalysis of {{ first_name }}
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <div class="text-center" v-show="isLoading">
            <img src="@/assets/images/loading.gif" class="img-fluid" />
          </div>

          <v-container grid-list-md  v-show="!isLoading">
            <v-layout wrap>
              
              <v-flex xs12 class="text-center">
                <h5>Physical Examination</h5>
              </v-flex>
              
              <v-flex xs12 sm6>
                <v-text-field label="Color*" readonly v-model="color"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Reaction*" readonly v-model="reaction"></v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Transparency*" readonly v-model="transparency"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Specific Gravity*" readonly v-model="specific_gravity">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Sugar*" readonly v-model="sugar"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Albumin*" readonly v-model="albumin"></v-text-field> 
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Microscopic Examination</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="RBC*" suffix="/hpf" readonly v-model="rbc"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Pus Cells*" suffix="/hpf" readonly v-model="pus_cells">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Ephethelial Cells</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Squamous Cells*" readonly v-model="squamous_cells">
                </v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Calcium Oxalate*" readonly v-model="calcium_oxalate">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Crystals</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Uric Acid*" readonly v-model="uric_acid"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Amorphous Urates*" readonly v-model="amorphous_urates">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Triple Phosphate*" readonly v-model="triple_phospate">
                </v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Mucus Threads*" readonly v-model="mucus_threads">
                </v-text-field> 
              </v-flex>

              <v-flex xs12>
                <v-textarea label="Others*" readonly v-model="others">
                </v-textarea> 
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Special Test</h5>
              </v-flex>

              <v-flex xs12>
                <v-textarea label="Pregnancy Test*" readonly v-model="pregnancy_test">
                </v-textarea> 
              </v-flex>

            </v-layout>
          </v-container>
          
          <small class="text-danger">*Indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <error-alert v-model="isErrorDialog">{{ error_message }}</error-alert>
  </v-layout>
</template>

<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import moment from 'moment';
  
export default {
  components:{
    ErrorAlert
  },
  props: ['value', 'unique_id'],
  data: () => ({
    isErrorDialog: false,
    isLoading: false,
    error_message: '',
    local_unique_id: 0,
    color: '',
    reaction: '',
    transparency: '',
    specific_gravity: '',
    sugar: '',
    albumin: '',
    rbc: '',
    pus_cells: '',
    squamous_cells: '',
    calcium_oxalate: '',
    uric_acid: '',
    amorphous_urates: '',
    triple_phospate: '',
    amorphous_urates: '',
    bacteria: '',
    mucus_threads: '',
    others: '',
    pregnancy_test: '',
    created_at: '',
    first_name: ''
  }),
  methods: {
    getLabResult(){
        this.isLoading = true;

        axios.get('/api/urinalyses/'+this.local_unique_id)
        .then((res) => {
          this.isLoading = false;
          this.inserted = false;

          this.isInsert = false;
          this.unique_id = res.data.id;
          this.color = res.data.color;
          this.reaction = res.data.reaction;
          this.transparency = res.data.transparency;
          this.specific_gravity = res.data.specific_gravity;
          this.sugar = res.data.sugar;
          this.albumin = res.data.albumin;
          this.rbc = res.data.rbc;
          this.pus_cells = res.data.pus_cells;
          this.squamous_cells = res.data.squamous_cells;
          this.calcium_oxalate = res.data.calcium_oxalate;
          this.uric_acid = res.data.uric_acid;
          this.amorphous_urates = res.data.amorphous_urates;
          this.triple_phospate = res.data.triple_phospate;
          this.amorphous_urates = res.data.amorphous_urates;
          this.bacteria = res.data.bacteria;
          this.mucus_threads = res.data.mucus_threads;
          this.others = res.data.others;
          this.pregnancy_test = res.data.pregnancy_test;
          this.created_at = moment(new Date(res.data.created_at)).format("MMM DD, YYYY");
          this.first_name = res.data.user.first_name; 
        })
        .catch(error => {
            this.isErrorDialog = true;
            this.error_message = error;
            this.isLoading = false;
            //alert(error);
            /*if (error.response.data.errors !== undefined) {
              var text = [];

              Object.entries(error.response.data.errors).forEach(
                  ([key, value]) => text.push(value)
              );

              var errorMessage = text.toString().replace(/,/g,"\n");
              alert(text.toString().replace(/,/g,"\n"));
            }*/
            /*if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);*/
        });
      }
  },
  watch: {
    unique_id: function(val){
      console.log("value is: "+val);
      this.local_unique_id = this.unique_id;
      this.getLabResult();
    }
  }
}
</script>