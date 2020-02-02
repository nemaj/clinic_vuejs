<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ created_at }} Fecalysis of {{ first_name }}
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <div class="text-center" v-show="isLoading">
            <img src="@/assets/images/loading.gif" class="img-fluid" />
          </div>

          <v-container grid-list-md  v-show="!isLoading">
            <v-layout wrap>
              
              <v-flex xs12 sm6>
                <v-text-field label="Color*" readonly v-model="color"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Consistency*" readonly v-model="consistency"></v-text-field> 
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Microscopic Examination</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Ascaris*" readonly v-model="ascaris"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Entamoeba Histolytica (Cyst)*" readonly v-model="cyst">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="T. Trichurs*" readonly v-model="t_trichurs"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="S. Japonicum*" readonly v-model="s_japonicum">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Hookworm*" readonly v-model="hookworm"></v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Entamoeba Coli*" readonly v-model="entamoeba_coli">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Entamoeba Histolytica (Troph)*" readonly v-model="troph">
                </v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Tape Worm*" readonly v-model="tape_worm">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Others</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Bacteria*" readonly v-model="bacteria">
                </v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="WBC*" readonly v-model="wbc">
                </v-text-field> 
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Fat Globules*" readonly v-model="fat_globules">
                </v-text-field> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="RBC*" readonly v-model="rbc">
                </v-text-field> 
              </v-flex>

            </v-layout>
          </v-container>
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
    consistency: '',
    ascaris: '',
    t_trichurs: '',
    hookworm: '',
    troph: '',
    cyst: '',
    s_japonicum: '',
    entamoeba_coli: '',
    tape_worm: '',
    bacteria: '',
    fat_globules: '',
    wbc: '',
    rbc: '',
    created_at: '',
    first_name: ''
  }),
  methods: {
    getLabResult(){
        this.isLoading = true;

        axios.get('/api/fecalyses/'+this.local_unique_id)
        .then((res) => {
            this.isLoading = false;
    
            this.color = res.data.color;
            this.consistency = res.data.consistency;
            this.ascaris = res.data.ascaris;
            this.t_trichurs = res.data.t_trichurs;
            this.hookworm = res.data.hookworm;
            this.troph = res.data.troph;
            this.cyst = res.data.cyst;
            this.s_japonicum = res.data.s_japonicum;
            this.entamoeba_coli = res.data.entamoeba_coli;
            this.tape_worm = res.data.tape_worm;
            this.bacteria = res.data.bacteria;
            this.fat_globules = res.data.fat_globules;
            this.wbc = res.data.wbc;
            this.rbc = res.data.rbc;
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