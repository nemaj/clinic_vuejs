<template>
<div>
  <v-dialog :value="value" persistent max-width="800px">
    <div class="add-diagnosis-dialog">
      <v-card v-show="!isLoading">
        <v-card-title>
        <span class="headline">View Analytics for {{ local_diagnosis.name }}</span>

        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 md6 class="pr-5">
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="menu1"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Picker in date one"
                  v-model="date1"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date1" no-title scrollable actions :max="max">
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md6 class="pl-5">
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="menu2"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Picker in date two"
                  v-model="date2"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date2" no-title scrollable actions :max="max" :min="date1">
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-text>
            <v-layout wrap>

              <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-success"></div>
                    <i class="lnr-user text-dark opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Adult Male</div>
                    <div class="widget-numbers">{{ totalAdultMale }}</div>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-success"></div>
                    <i class="lnr-user text-dark opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Adult Women</div>
                    <div class="widget-numbers">{{ totalAdultFemale }}</div>
                  </div>
                </div>
              </v-flex>

              <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-primary"></div>
                    <i class="lnr-user text-light opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Senior Male</div>
                    <div class="widget-numbers">{{ totalSeniorMale }}</div>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-primary"></div>
                    <i class="lnr-user text-light opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Senior Women</div>
                    <div class="widget-numbers">{{ totalSeniorFemale }}</div>
                  </div>
                </div>
              </v-flex>

              <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                    <i class="lnr-user text-dark opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Children Male</div>
                    <div class="widget-numbers">{{ totalKidMale }}</div>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                    <i class="lnr-user text-dark opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Children Women</div>
                    <div class="widget-numbers">{{ totalKidFemale }}</div>
                  </div>
                </div>
              </v-flex>

            <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                    <i class="lnr-user text-dark opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Teenager Male</div>
                    <div class="widget-numbers">{{ totalTeenMale }}</div>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                  <div class="icon-wrapper rounded-circle">
                    <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                    <i class="lnr-user text-dark opacity-8"></i></div>
                  <div class="widget-chart-content">
                    <div class="widget-subheading">Teenager Women</div>
                    <div class="widget-numbers">{{ totalTeenFemale }}</div>
                  </div>
                </div>
              </v-flex>

            </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('input')">Close</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="text-center" v-show="isLoading">
        <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 20%" />
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
import moment from 'moment';

export default {
  components: {
    SuccessAlert,
    ErrorAlert
  },
  props: ['value', 'diagnosis'],
  data: () => ({
    max: moment().format("YYYY-MM-DD"),
    date1: null,
    menu1: false,
    date2: null,
    menu2: false,
    isSuccessAlert: false,
    isErrorAlert: false,
    success_message: '',
    errors: [],
    isLoading: false,
    totalAdultMale: 0,
    totalAdultFemale: 0,
    totalSeniorMale: 0,
    totalSeniorFemale: 0,
    totalKidMale: 0,
    totalKidFemale: 0,
    totalTeenFemale: 0,
    totalTeenMale: 0,
    local_diagnosis: {}
  }),
  methods: {
    getTotalAdultMale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_between]=19,59&filter[sex]=M&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalAdultMale = res.data.meta.total;
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
    getTotalAdultFemale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_between]=19,59&filter[sex]=F&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalAdultFemale = res.data.meta.total;
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
    getTotalTeenMale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_between]=13,18&filter[sex]=M&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalTeenMale = res.data.meta.total;
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
    getTotalTeenFemale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_between]=13,18&filter[sex]=F&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalTeenFemale = res.data.meta.total;
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
    getTotalSeniorMale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_equal_or_above]=60&filter[sex]=M&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalSeniorMale = res.data.meta.total;
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
    getTotalSeniorFemale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_equal_or_above]=60&filter[sex]=F&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalSeniorFemale = res.data.meta.total;
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
    getTotalKidMale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_equal_or_below]=12&filter[sex]=M&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalKidMale = res.data.meta.total;
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
    getTotalKidFemale(){
      this.isLoading = true;

      axios.get('/api/diagnosis_users?filter[diagnosis_id]='+this.local_diagnosis.id+'&filter[age_equal_or_below]=12&filter[sex]=F&filter[date_between]='+this.date1+','+this.date2+'&filter[user_types]=G;SC&rows_per_page=1')
      .then((res) => {
        this.isLoading = false;
        this.totalKidFemale = res.data.meta.total;
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
  },
  watch: {
    diagnosis (val) {
      this.local_diagnosis = val;
      this.totalKidMale = 0;
      this.totalKidFemale = 0;
      this.totalAdultMale = 0;
      this.totalAdultFemale = 0;
      this.totalSeniorMale = 0;
      this.totalSeniorFemale = 0;
      this.totalTeenMale = 0;
      this.totalTeenFemale = 0;
      this.date1 = null;
      this.date2 = null;
    },
    date2(val){
      this.menu2 = false;
      this.getTotalKidMale();
      this.getTotalKidFemale();
      this.getTotalAdultFemale();
      this.getTotalAdultMale();
      this.getTotalSeniorMale();
      this.getTotalSeniorFemale();
      this.getTotalTeenFemale();
      this.getTotalTeenMale();
    },
    date1(val){
      this.menu1 = false;
      this.getTotalKidMale();
      this.getTotalKidFemale();
      this.getTotalAdultFemale();
      this.getTotalAdultMale();
      this.getTotalSeniorMale();
      this.getTotalSeniorFemale();
      this.getTotalTeenFemale();
      this.getTotalTeenMale();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
