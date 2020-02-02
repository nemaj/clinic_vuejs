<template>
<div>
  <v-dialog :value="value" @input="$emit('input')" persistent max-width="600px">
      <!--template v-slot:activator="{ on }">
        <button style="width: 200px" type="button" tabindex="0" class="dropdown-item warning edit_staff" v-on="on"
        @click="getUser">
          <i class="dropdown-icon pe-7s-id"></i>Edit Patient
        </button>
      </template-->
      <v-card>
        <v-card-title>
          <span class="headline">Edit Staff Info: {{ ref }}</span>
        </v-card-title>
        <v-card-text>
          <div class="text-center" v-show="isLoading">
            <img src="@/assets/images/loading.gif" class="img-fluid" />
          </div>
          <v-container grid-list-md v-show="!isLoading">
            <v-layout wrap>
              
              <v-flex xs12>
                <v-switch v-model="active" label="Still working in hospital?"></v-switch>  
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Username" v-model="username" readonly></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="First Name*" required v-model="first_name"></v-text-field>
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Middle Name" v-model="middle_name"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Last Name*" required  v-model="last_name"></v-text-field>
              </v-flex>
              
              <v-flex xs12>
                <v-text-field label="Name Suffix" v-model="name_suffix"></v-text-field>
              </v-flex>
           
            <v-flex xs6>
              <v-radio-group v-model="sex">
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
          <v-btn color="blue darken-1" flat @click.native="$emit('input')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveUser" :disabled="isLoading">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <success-alert v-model="isSuccessDialog">{{ success_message }}</success-alert>
    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
</div>
</template>

<script>
  import { axios } from '@/plugins/axios';
  import moment from 'moment';
  import ErrorAlert from "../../Components/Alerts/Error.vue";
  import SuccessAlert from "../../Components/Alerts/Success.vue";

  export default {
    components:{
      ErrorAlert,
      SuccessAlert
    },
    props:['value', 'user_id'],
    data: () => ({
      moment: moment,
      local_user_id: 0,
      blood_types: ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'],
      types: [
        {code: 'D', desc: 'Doctor'},
        {code: 'A', desc: 'Assistant'},
        {code: 'M', desc: 'Med Tech'},
        {code: 'P', desc: 'Pharmacist'}
      ],
      birthday: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      ref: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      name_suffix: '',
      username: '',
      sex: '',
      blood_type:'',
      type: {},
      active: false,
      radioGroup: 1,
      isLoading: false,
      isSuccessDialog: false,
      isErrorDialog: false,
      success_message: '',
      errors: []
    }),
    methods:{
      saveUser(){
        this.isLoading = true;
        
        axios.put('/api/users/'+this.local_user_id, {
          first_name: this.first_name,
          last_name: this.last_name,
          middle_name: this.middle_name,
          name_suffix: this.name_suffix,
          birthday: this.birthday,
          sex: this.sex,
          blood_type: this.blood_type,
          type: this.type.code,
          active: this.active
        })
        .then((res) => {
          this.isLoading = false;
          
          this.$emit('input');
          this.$emit('user-edited');

          this.isSuccessDialog = true;
          this.success_message = "Record for User ID: "+this.local_user_id+" saved successfully";
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
      getUser(){
        this.isLoading = true;

        axios.get('/api/users/'+this.local_user_id)
        .then((res) => {
          this.isLoading = false;
            //console.log(res.data);
            //this.user = res.data;
          this.first_name = res.data.first_name;
          this.ref = res.data.ref;
          this.middle_name = res.data.middle_name;
          this.last_name = res.data.last_name;
          this.name_suffix = res.data.name_suffix;
          this.sex = res.data.sex;
          this.blood_type = res.data.blood_type;
          this.birthday = moment(new Date(res.data.birthday)).format("YYYY-MM-DD");
          this.type.code = res.data.type;
          this.type.desc = res.data.type_text;
          this.type = {code: res.data.type, desc: res.data.type_text};
          this.active = res.data.active;
          this.username = res.data.username;
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
    },
    watch:{
      user_id: function(val){
        console.log("user id is: "+val);
        this.local_user_id = val;
        this.getUser();
      }
    }
  }
</script>

<style scoped>
.edit_staff{
  width: 188px;
  height: 30px;
}
</style>