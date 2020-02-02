<template>
<div class="app-page-title">
  <div class="page-title-wrapper">
      <div class="page-title-heading">
          <div class="page-title-icon">
              <i :class="icon"/>
          </div>
          <div>
              {{heading}}
              <div
                  class="page-title-subheading">
                  {{subheading}}
              </div>
          </div>
      </div>
      <div class="page-title-actions">
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Add Staff</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Enter Staff Info</span>
              </v-card-title>
              <v-card-text>
                <div class="text-center" v-show="isLoading">
                  <img src="@/assets/images/loading.gif" class="img-fluid" />
                </div>
                <v-container grid-list-md v-show="!isLoading">
                  <v-layout wrap>
                    
                    <v-flex xs12>
                      <v-text-field label="Username*" required v-model="username"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="Email*" required v-model="email"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="Password*" required v-model="password"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="First Name*" required v-model="first_name"></v-text-field>
                    </v-flex>
                    
                    <v-flex xs12>
                      <v-text-field label="Middle Name"  v-model="middle_name"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="Last Name*" required  v-model="last_name"></v-text-field>
                    </v-flex>
                    
                    <v-flex xs12>
                      <v-text-field label="Name Suffix" v-model="name_suffix"></v-text-field>
                    </v-flex>
                  
                  <v-flex xs6>
                  <v-radio-group v-model="sex" row>
                      <v-radio label="Male" value="M"></v-radio>
                       <v-radio label="Female" value="F"></v-radio>
                  </v-radio-group>
                  </v-flex>
          
                    <v-flex xs6>
                      <v-select
                      :items="blood_types"
                      label="Blood Type"
                      v-model="blood_type"
                      ></v-select>
                  </v-flex>

              <v-flex xs6>  
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="birthday"
                  persistent
                  lazy
                  full-width
                  width="290px"
                  >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="birthday"
                      label="Date of Birth*"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="birthday" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(birthday)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex xs6>
                <v-select label="Type*" v-model="type" :hint="`${type.code}, ${type.desc}`"
                  :items="types"
                  item-text="desc"
                  item-value="code"
                  persistent-hint
                  return-object
                  single-line
                  >
                </v-select>
              </v-flex>
                    
                  </v-layout>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="insertStaff">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </div>
  </div>

  <success-alert v-model="isSuccessDialog">{{ first_name }} added successfully</success-alert>
  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
</div>
</template>
<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import SuccessAlert from "../../../Components/Alerts/Success.vue";
import ErrorAlert from "../../../Components/Alerts/Error.vue";

export default {
  components: {
      SuccessAlert,
      ErrorAlert
  },
  props: {
      icon: String,
      heading: String,
      subheading: String,
  },
  data: () => ({
    dialog: false,
    modal: false,
    isLoading: false,
    isSuccessDialog: false,
    isErrorDialog: false,
    errors: [],
    blood_types: ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'],
    types: [
      {code: 'D', desc: 'Doctor'},
      {code: 'A', desc: 'Assistant'},
      {code: 'M', desc: 'Med Tech'},
      {code: 'P', desc: 'Pharmacist'}
    ],
    menu: false,
    modal: false,
    menu2: false,
    username: "",
    email: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name:"",
    name_suffix: "",
    sex: "M",
    birthday: new Date().toISOString().substr(0, 10),
    blood_type: "",
    type: {code: 'D', desc: 'Doctor'}
  }),
  methods: {
    insertStaff(){
      this.isLoading = true;

      axios.post('/api/users',{
        username: this.username,
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        middle_name: this.middle_name,
        name_suffix: this.name_suffix,
        blood_type: this.blood_type,
        sex: this.sex,
        birthday: moment(new Date(this.birthday)).format("YYYY-MM-DD"),
        type: this.type.code,
        active: 1
      })
      .then((res) => {
        //alert(this.first_name+" added successfully");
        axios.put('/api/users/'+res.data.id, {
          ref: moment().format("YYYY")+'-'+res.data.id
        })
        .then((res) => {
          this.dialog = false;
          this.isLoading = false;
          this.isSuccessDialog = true;
          this.$emit('new-user-added');        
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
