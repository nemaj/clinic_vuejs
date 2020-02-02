<template>
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="h5 modal-title text-center">
                        <h4 class="mt-2">
                            <div>
                              <v-btn color="primary" fab dark title="Change Avatar" @click="toggleShow">
                                <font-awesome-icon icon="image" style="color:white;" size="2x" />
                              </v-btn>
                              <my-upload field="file"
                                    @crop-success="cropSuccess"
                                    @crop-upload-success="cropUploadSuccess"
                                    @crop-upload-fail="cropUploadFail"
                                    v-model="show"
                                :width="50"
                                :height="50"
                                :url="uploadURL"
                                :params="params"
                                lang-type="en"
                                method="post"
                              ></my-upload>
                              <img :src="imgDataUrl" />    
                            </div>
                        </h4>
                    </div>

                    <div class="divider"/>
                </div>
            </div>
        </div>

    </div>

    <div class="col-md-6">
        
        <div class="modal-dialog w-100 mx-auto" v-show="!isLoading">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="h5 modal-title text-center">
                        <h4 class="mt-2">
                            <div>Change password</div>
                        </h4>
                    </div>
                    <b-form-group>
                        <b-form-input type="password"
                                      required
                                      placeholder="Current password*" 
                                      v-model="current_password" 
                                      autocomplete="off" />
                        </b-form-input>
                    </b-form-group>
                    
                    <b-form-group>
                        <b-form-input type="password"
                                      required
                                      placeholder="New password*"
                                      v-model="new_password" 
                                      autocomplete="off" />
                        </b-form-input>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input type="password"
                                      required
                                      placeholder="Confirm password*"
                                      v-model="confirm_password" 
                                      autocomplete="off" />
                        </b-form-input>
                    </b-form-group>
                    
                    <div class="alert alert-danger" v-show="new_password != confirm_password">
                      <strong>Error!</strong> Password don't match
                    </div>

                    <div class="divider"/>
                </div>
                <div class="modal-footer clearfix" v-show="(new_password == confirm_password) && new_password && confirm_password">
                    <div class="float-right">
                        <b-button variant="primary" size="lg" @click="changePassword">
                          Change password
                        </b-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center" v-show="isLoading">
          <img src="@/assets/images/loading.gif" class="img-fluid" />
        </div>
    </div>
  </div>
  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
</div>
</template>

<script>
  var loggedUser = JSON.parse(localStorage.getItem("user"));

  import 'babel-polyfill'; // es6 shim
  import Vue from 'vue';
  import myUpload from 'vue-image-crop-upload';
  import { axios } from '@/plugins/axios';
  import ErrorAlert from '../Components/Alerts/Error';
  import SuccessAlert from '../Components/Alerts/Success';

  export default {
    components: {
      'my-upload': myUpload,
      ErrorAlert,
      SuccessAlert
    },
    data: () => ({
      uploadURL: localStorage.getItem("apiURL")+"/api/uploads",
      show: false,
      params: {
        uploadable_id: loggedUser.id,
        uploadable_type: "App\\User"
      },
      imgDataUrl: '', // the datebase64 url of created image,
      post:'POST',
      current_password: '',
      new_password: '',
      confirm_password:'',
      isErrorDialog: false,
      isLoading: false,
      isSuccessDialog: false,
      success_message: '',
      errors: []
    }),
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
            /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field){
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
      changePassword(){
        this.isLoading = true;

        axios.post('api/auth/change_password', {
          username:     loggedUser.username,
          password:     this.current_password,
          new_password: this.new_password 
        })
        .then((res) => {
          this.isLoading = false;
          this.isSuccessDialog = true;
          this.success_message = 'Your password has been changed successfully!';
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