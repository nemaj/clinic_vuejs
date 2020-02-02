<template>  
  <div>
    <button style="width: 200px" type="button" tabindex="0" class="dropdown-item success send_to_checkup"
    @click="sendToCheckUp" v-show="!isLoading">
    	<i class="dropdown-icon pe-7s-paper-plane"></i> Send to Check-up
    </button>
    <v-card-text v-show="isLoading">
      Sending to Queue...
      <v-progress-linear indeterminate color="green" class="mb-0"></v-progress-linear>
    </v-card-text>

    <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </div>    
</template>

<script>
  import { axios } from '@/plugins/axios';
  import moment from 'moment';
  import SuccessAlert from "../Components/Alerts/Success.vue";
  import ErrorAlert from "../Components/Alerts/Error.vue";

  export default {
  	props:['user_id'],
    components: {
      SuccessAlert,
      ErrorAlert
    },
    data: () => ({
      moment: moment,
      local_user_id: 0,
      isLoading: false,
      isSuccessDialog: false,
      success_message: '',
      isErrorDialog: false,
      errors: []
    }),
    mounted(){
      this.local_user_id = this.user_id;
    },
    methods:{
      queuePatient(){
        axios.put('/api/users/'+this.local_user_id, {
          is_queue: 1
        })
        .then((res) => {
          //console.log(res.data);
          this.$emit('sent-to-queue');
          this.isSuccessDialog = true;
          this.success_message = res.data.first_name+" is now waiting for check-up";
          this.isLoading = false;
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
      sendToCheckUp(){
        this.isLoading = true;
        //before we send patient to check-up, check if it has user other info today
        axios.get('/api/user_other_infos?filter[this_day]='+moment().format("YYYY-MM-DD")+'&filter[user_id]='+this.local_user_id)
        .then((res) => {
            if (!res.data.meta.total) {
              this.errors = [];
              this.errors.push('You need to have User other Info for this user this day before sending to check-up');
              this.isErrorDialog = true;
              this.isLoading = false;
            } else {
              axios.get('/api/check_ups?filter[this_day]='+moment().format("YYYY-MM-DD"))
              .then((res) => {
                  axios.post('/api/check_ups',{
                    user_id: this.local_user_id,
                    queue_no: (res.data.meta.total + 1),
                    status: 'Q'
                  })
                  .then((res) => {
                    //console.log(res.data);

                    //this.$emit('sent-to-queue');
                    this.queuePatient();
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
</script>