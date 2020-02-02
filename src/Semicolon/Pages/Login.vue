<template>
    <div class="login-page">
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <!-- <div class="app-logo-inverse mx-auto mb-3"/> -->

                    <div class="modal-dialog w-100 mx-auto" v-show="!isLoading">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>Welcome back,</div>
                                        <span>Please sign in to your account below.</span>
                                    </h4>
                                </div>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1"
                                              description="">
                                    <b-form-input id="exampleInput1"
                                                  type="text"
                                                  required
                                                  placeholder="Enter username..."
                                                  v-model="username" />
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup2"
                                              label-for="exampleInput2">
                                    <b-form-input id="exampleInput2"
                                                  type="password"
                                                  required
                                                  placeholder="Enter password..."
                                                  v-model="password" />
                                    </b-form-input>
                                </b-form-group>
                                <div class="divider"/>
                            </div>
                            <div class="modal-footer clearfix">
                                <!--div class="float-left">
                                    <a href="javascript:void(0);" class="btn-lg btn btn-link">Recover
                                        Password</a>
                                </div-->
                                <div class="float-right">
                                    <b-button variant="primary" size="lg" @click="login">
                                      Login to Dashboard
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center" v-show="isLoading">
                      <img src="@/assets/images/loading.gif" class="img-fluid" />
                    </div>

                    <!-- <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; ArchitectUI 2019
                    </div> -->
                </b-col>
            </div>
        </div>

        <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
    </div>
</template>
<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from '../Components/Alerts/Error';

export default {
  components: { ErrorAlert },
  data: () => ({
    username: '',
    password: '',
    isLoading: false,
    isErrorDialog: false,
    errors: []
  }),
  methods: {
    login(){
      this.isLoading = true;

      axios.post('api/auth/login', {
        username: this.username,
        password: this.password
      })
      .then((res) => {
        // Store
        localStorage.setItem("loggedInToken", res.data.token_type+' '+res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        axios.get('api/uploads?filter[uploadable_id]='+res.data.user.id+'&filter[uploadable_type]=App\\User&sort=-created_at&rows_per_page=1')
        .then((photo) => {
          if (photo.data.data.length) {
            var photoURL=photo.data.data[0].url.replace("uploads", "storage/uploads");
            var webURL = localStorage.getItem("apiURL");

            localStorage.setItem("avatar", webURL+photoURL);
          } else {
            localStorage.setItem("avatar", "@/assets/images/avatars/1.jpg");
          }

          window.location.href = "/home";
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
  }
}
</script>
<style lang="scss" scoped>
  .login-page {
    height: 100vh;
    > .bg-plum-plate {
      background-image: url('../../assets/images/login-page.jpg') !important;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
    }
  }
</style>
