<template>
  <v-layout row justify-center>
    <!-- <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px" scrollable> -->
      <v-card>
        <v-card-title>
          <span class="headline">
          {{ isInsert ? 'Add' : 'Edit' }} Today's Urinalysis for User ID {{ local_user_id }}
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
                <v-text-field label="Color"  v-model="color"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Reaction"  v-model="reaction"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Transparency"  v-model="transparency"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Specific Gravity"  v-model="specific_gravity">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Sugar"  v-model="sugar"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Albumin"  v-model="albumin"></v-text-field>
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Microscopic Examination</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="RBC" suffix="/hpf"  v-model="rbc"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Pus Cells" suffix="/hpf"  v-model="pus_cells">
                </v-text-field>
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Ephethelial Cells</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Squamous Cells"  v-model="squamous_cells">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Calcium Oxalate"  v-model="calcium_oxalate">
                </v-text-field>
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Crystals</h5>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Uric Acid"  v-model="uric_acid"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Amorphous Urates"  v-model="amorphous_urates">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Triple Phosphate"  v-model="triple_phospate">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Mucus Threads"  v-model="mucus_threads">
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-textarea label="Others"  v-model="others">
                </v-textarea>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Bacteria"  v-model="bacteria">
                </v-text-field>
              </v-flex>

              <v-flex xs12 class="text-center">
                <h5>Special Test</h5>
              </v-flex>

              <v-flex xs12>
                <v-textarea label="Pregnancy Test"  v-model="pregnancy_test">
                </v-textarea>
              </v-flex>

            </v-layout>
          </v-container>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!--v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn-->
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
    others: '',
    pregnancy_test: '',
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

      axios.put('/api/urinalyses/'+this.unique_id,{
        user_id: this.local_user_id,
        color: this.color,
        reaction: this.reaction,
        transparency: this.transparency,
        specific_gravity: this.specific_gravity,
        sugar: this.sugar,
        albumin: this.albumin,
        rbc: this.rbc,
        pus_cells: this.pus_cells,
        squamous_cells: this.squamous_cells,
        calcium_oxalate: this.calcium_oxalate,
        uric_acid: this.uric_acid,
        amorphous_urates: this.amorphous_urates,
        triple_phospate: this.triple_phospate,
        amorphous_urates: this.amorphous_urates,
        bacteria: this.bacteria,
        mucus_threads: this.mucus_threads,
        others: this.others,
        pregnancy_test: this.pregnancy_test
      })
      .then((res) => {
        this.isLoading = false;
        this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Urinalysis updated successfully";
        this.$emit('result-updated');
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

      axios.post('/api/urinalyses',{
        user_id: this.local_user_id,
        color: this.color,
        reaction: this.reaction,
        transparency: this.transparency,
        specific_gravity: this.specific_gravity,
        sugar: this.sugar,
        albumin: this.albumin,
        rbc: this.rbc,
        pus_cells: this.pus_cells,
        squamous_cells: this.squamous_cells,
        calcium_oxalate: this.calcium_oxalate,
        uric_acid: this.uric_acid,
        amorphous_urates: this.amorphous_urates,
        triple_phospate: this.triple_phospate,
        amorphous_urates: this.amorphous_urates,
        bacteria: this.bacteria,
        mucus_threads: this.mucus_threads,
        others: this.others,
        pregnancy_test: this.pregnancy_test
      })
      .then((res) => {
        this.isLoading = false;
        // this.$emit('input');
        this.isSuccessDialog = true;
        this.success_message = "Urinalysis inserted successfully";
        // this.$emit('result-updated');
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

        axios.get('/api/urinalyses?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
          this.isLoading = false;
          this.inserted = false;

          if (res.data.data.length) {
            this.isInsert = false;
            this.unique_id = res.data.data[0].id;
            this.color = res.data.data[0].color;
            this.reaction = res.data.data[0].reaction;
            this.transparency = res.data.data[0].transparency;
            this.specific_gravity = res.data.data[0].specific_gravity;
            this.sugar = res.data.data[0].sugar;
            this.albumin = res.data.data[0].albumin;
            this.rbc = res.data.data[0].rbc;
            this.pus_cells = res.data.data[0].pus_cells;
            this.squamous_cells = res.data.data[0].squamous_cells;
            this.calcium_oxalate = res.data.data[0].calcium_oxalate;
            this.uric_acid = res.data.data[0].uric_acid;
            this.amorphous_urates = res.data.data[0].amorphous_urates;
            this.triple_phospate = res.data.data[0].triple_phospate;
            this.amorphous_urates = res.data.data[0].amorphous_urates;
            this.bacteria = res.data.data[0].bacteria;
            this.mucus_threads = res.data.data[0].mucus_threads;
            this.others = res.data.data[0].others;
            this.pregnancy_test = res.data.data[0].pregnancy_test;
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
        window.open(localStorage.getItem("apiURL")+"/print/urinalysis?id="+this.unique_id);
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
