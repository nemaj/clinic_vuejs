<template>
  <div>
    <v-layout row justify-center>
      <v-dialog :value="value" @input="$emit('input')" persistent max-width="800px">
        <!--template v-slot:activator="{ on }">
          <button style="width: 200px" type="button" tabindex="0" class="dropdown-item info send_to_checkup"
          v-on="on" @click="checkOtherInfoToday">
            <i class="dropdown-icon pe-7s-note2"></i> Insert/Update Other Info
          </button>
        </template-->
        <v-card v-show="!isLoading">
          <v-card-title>
            <span class="headline">
              {{ isInsert ? 'Insert' : 'Update' }}
              Today's Other Info for User ID {{ local_user_id }}
            </span>
          </v-card-title>
          <v-container>
            <form-wizard
              title=""
              subtitle=""
              shape="square"
              color="#3498db"
              @on-complete="onComplete"
              ref="wizard"
            >
              <tab-content
                title="Info"
                icon="pe-7s-display2"
                :before-change="getComplain"
              >
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Enter Complaint*" v-model="complain" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Enter Height" v-model="height"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Enter Weight" v-model="weight"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Enter Blood Pressure" v-model="blood_pressure"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Enter Temperature" v-model="temperature"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Heart Rate" v-model="heart_rate"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>* Indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </tab-content>
              <tab-content
                title="Upload Images"
                icon="pe-7s-upload">
                <!--h1>User Other Info ID: {{ user_other_info_id }}</h1-->
                <upload-image :user_other_info_id="user_other_info_id" v-on:uploaded="isRefreshCarousel = true">
                </upload-image>
              </tab-content>
              <tab-content
                title="Uploaded Photos"
                icon="pe-7s-photo">
                <patient-images 
                  :user_other_info_id="user_other_info_id" 
                  :is_refresh_carousel="isRefreshCarousel" 
                  v-on:doneRefresh="isRefreshCarousel = false"
                >
                </patient-images>
              </tab-content>
            </form-wizard>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-show="isLoading">
          <v-container class="text-center" >
              <img src="@/assets/images/loading.gif" class="img-fluid" style="width: 50%" />
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </div>
</template>

<script>
  import { FormWizard, TabContent } from 'vue-form-wizard'
  import { axios } from '@/plugins/axios';
  import moment from 'moment';
  import ErrorAlert from "../Components/Alerts/Error.vue";
  import SuccessAlert from "../Components/Alerts/Success.vue";6
  import PatientImages from '../Components/Patients/PatientImages.vue';
  import UploadImage from '../Components/Patients/UploadImage.vue';

  export default {
    components:{
      FormWizard,
      TabContent,
      SuccessAlert,
      ErrorAlert,
      PatientImages,
      UploadImage
    },
    props:['value', 'user_id'],
    data: () => ({
      local_user_id: 0,
      user_other_info_id: 0,
      complain: '',
      height: '',
      weight: '',
      blood_pressure: '',
      temperature: '',
      heart_rate: '',
      isInsert: false,
      isLoading: false,
      isErrorDialog: false,
      isSuccessDialog: false,
      errors: [],
      success_message: '',
      isRefreshCarousel: false
    }),
    methods:{
      saveOtherInfo(){
        if (this.isInsert) {
          this.insertOtherInfo();
        } else {
          this.updateOtherInfo();
        } 
      },
      updateOtherInfo(){
        this.isLoading = true;

        axios.put('/api/user_other_infos/'+this.user_other_info_id, {
          complain: this.complain,
          height: this.height,
          weight: this.weight,
          blood_pressure: this.blood_pressure,
          temperature: this.temperature,
          heart_rate: this.heart_rate
        })
        .then((res) => {
          this.isLoading = false;
          //this.$emit('input');
          //this.isSuccessDialog = true;
          //this.success_message = "User Other Info has been updated successfully";
          this.$emit('other-info-updated');
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
      insertOtherInfo(){
        this.isLoading = true;

        axios.post('/api/user_other_infos', {
          user_id: this.local_user_id,
          complain: this.complain,
          height: this.height,
          weight: this.weight,
          blood_pressure: this.blood_pressure,
          temperature: this.temperature,
          heart_rate: this.heart_rate
        })
        .then((res) => {
          this.isLoading = false;
          this.isInsert = false;
          this.user_other_info_id = res.data.id;
          this.$emit('other-info-updated');
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
      checkOtherInfoToday(){
        this.isLoading = true;

        axios.get('/api/user_other_infos?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
          this.isLoading = false;

          if (res.data.data.length) {
            this.isInsert = false;
            this.user_other_info_id = res.data.data[0].id;
            this.complain = res.data.data[0].complain;
            this.height = res.data.data[0].height;
            this.weight = res.data.data[0].weight;
            this.blood_pressure  = res.data.data[0].blood_pressure;
            this.temperature  = res.data.data[0].temperature;
            this.heart_rate = res.data.data[0].heart_rate;
          } else {
            this.isInsert = true;
            this.user_other_info_id = 0;
            this.complain = "";
            this.height = "";
            this.weight = "";
            this.blood_pressure  = "";
            this.temperature  = "";
            this.heart_rate = "";
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
      onComplete(){
        this.$emit('input');
      },
      getComplain(){
        if (this.complain) {
          this.saveOtherInfo();

          return true;
        } else {
          this.isErrorDialog = true;
          this.errors = [];
          this.errors.push('Error: Complain is required');

          return false;
        }
      }
    },
    watch: {
      value: function(val){
        this.$refs.wizard.reset();
        this.local_user_id = this.user_id;
        this.checkOtherInfoToday();
      }
    }
  }
</script>
