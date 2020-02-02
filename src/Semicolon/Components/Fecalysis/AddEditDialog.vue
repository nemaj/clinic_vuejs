<template>
  <v-layout row justify-center>
    <!-- <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable> -->
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ isInsert ? 'Add' : 'Edit' }} Today's Fecalysis for User ID {{ local_user_id }}
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
                <v-text-field label="Color" v-model="color"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Consistency" v-model="consistency"></v-text-field>
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Microscopic Examination</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Ascaris" v-model="ascaris"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Entamoeba Histolytica (Cyst)" v-model="cyst">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="T. Trichurs" v-model="t_trichurs"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="S. Japonicum" v-model="s_japonicum">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Hookworm" v-model="hookworm"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Entamoeba Coli" v-model="entamoeba_coli">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Entamoeba Histolytica (Troph)" v-model="troph">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Tape Worm" v-model="tape_worm">
                </v-text-field>
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Others</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Bacteria" v-model="bacteria">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="WBC" v-model="wbc">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Fat Globules" v-model="fat_globules">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="RBC" v-model="rbc">
                </v-text-field>
              </v-flex>

            </v-layout>
          </v-container>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn> -->
          <v-btn color="blue darken-1" flat @click.native="saveOtherInfo" :disabled="inserted">
            {{ isInsert ? 'Add' : 'Save' }} Test Result
          </v-btn>
        </v-card-actions>
      </v-card>
    <!-- </v-dialog> -->


  <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </v-layout>
</template>

<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";
import SuccessAlert from "../../Components/Alerts/Success.vue";
import moment from 'moment';

export default {
  components:{
    SuccessAlert,
    ErrorAlert
  },
  props: ['user_id'],
  data: () => ({
    isSuccessDialog: false,
    isErrorDialog: false,
    isLoading: false,
    success_message: '',
    errors: [],
    isInsert: true,
    inserted: false,
    unique_id: 0,
    local_user_id: 0,
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
    rules: {required: value => !!value || 'Required.'}
  }),
  mounted(){
    this.local_user_id = this.user_id;
    this.getLabResultToday();
  },
  methods: {
    saveOtherInfo(){
      if (this.isInsert) {
        this.insertLabResult();
      } else {
        this.updateLabResult();
      }
    },
    updateLabResult(){
      this.isLoading = true;

      axios.put('/api/fecalyses/'+this.unique_id,{
        user_id: this.local_user_id,
        color: this.color,
        consistency: this.consistency,
        ascaris: this.ascaris,
        t_trichurs: this.t_trichurs,
        hookworm: this.hookworm,
        troph: this.troph,
        cyst: this.cyst,
        s_japonicum: this.s_japonicum,
        entamoeba_coli: this.entamoeba_coli,
        tape_worm: this.tape_worm,
        bacteria: this.bacteria,
        fat_globules: this.fat_globules,
        wbc: this.wbc,
        rbc: this.rbc
      })
      .then((res) => {
        this.isLoading = false;
        // this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Fecalysis updated successfully";
        // this.$emit('result-updated');
        this.print();
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
    insertLabResult(){
      this.inserted = true;
      this.isLoading = true;

      axios.post('/api/fecalyses',{
        user_id: this.local_user_id,
        color: this.color,
        consistency: this.consistency,
        ascaris: this.ascaris,
        t_trichurs: this.t_trichurs,
        hookworm: this.hookworm,
        troph: this.troph,
        cyst: this.cyst,
        s_japonicum: this.s_japonicum,
        entamoeba_coli: this.entamoeba_coli,
        tape_worm: this.tape_worm,
        bacteria: this.bacteria,
        fat_globules: this.fat_globules,
        wbc: this.wbc,
        rbc: this.rbc
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Fecalysis inserted successfully";
        this.$emit('result-updated');
        this.getLabResultToday();
        this.unique_id = res.data.id;
        this.print();
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
    getLabResultToday(){
        this.isLoading = true;

        axios.get('/api/fecalyses?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
          this.isLoading = false;
          this.inserted = false;

          if (res.data.data.length) {
            this.isInsert = false;
            this.unique_id = res.data.data[0].id;
            this.color = res.data.data[0].color;
            this.consistency = res.data.data[0].consistency;
            this.ascaris = res.data.data[0].ascaris;
            this.t_trichurs = res.data.data[0].t_trichurs;
            this.hookworm = res.data.data[0].hookworm;
            this.troph = res.data.data[0].troph;
            this.cyst = res.data.data[0].cyst;
            this.s_japonicum = res.data.data[0].s_japonicum;
            this.entamoeba_coli = res.data.data[0].entamoeba_coli;
            this.tape_worm = res.data.data[0].tape_worm;
            this.bacteria = res.data.data[0].bacteria;
            this.fat_globules = res.data.data[0].fat_globules;
            this.wbc = res.data.data[0].wbc;
            this.rbc = res.data.data[0].rbc;
          } else {
            this.isInsert = true;
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
        window.open(localStorage.getItem("apiURL")+"/print/fecalysis?id="+this.unique_id);
      }
  }/*,
  watch: {
    user_id: function(val){
      console.log("value is: "+val);
      this.local_user_id = this.user_id;
      this.getLabResultToday();
    }
  }*/
}
</script>