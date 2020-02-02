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
        <v-btn color="primary" dark v-on="on">Add Patient</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Enter Patient Info</span>
        </v-card-title>
        <v-card-text>
          <div class="text-center" v-show="isLoading">
            <img src="@/assets/images/loading.gif" class="img-fluid" />
          </div>
          <v-container grid-list-md v-show="!isLoading">
            <v-layout wrap>
              
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

            <v-flex xs12>  
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
                <v-date-picker v-model="birthday" scrollable :max="max">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(birthday)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>

            <v-flex xs12>
              <v-textarea solo rows="3" v-model="address" label="Address"></v-textarea>
            </v-flex>
      
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="insertPatient">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
            </div>
        </div>
      <success-alert v-model="isSuccessDialog">Patient added successfully</success-alert>
      <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
    </div>
</template>

<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faStar,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
//import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import SuccessAlert from "../Components/Alerts/Success.vue";
import ErrorAlert from "../Components/Alerts/Error.vue";

library.add(
    faStar,
    faPlus,
);

export default {
    components: {
        //'font-awesome-icon': FontAwesomeIcon,
      SuccessAlert,
      ErrorAlert
    },
    props: {
        icon: String,
        heading: String,
        subheading: String,
    },
    data: () => ({
        max: moment().format("YYYY-MM-DD"),
        dialog: false,
        isSuccessDialog: false,
        isErrorDialog: false,
        isLoading: false,
        errors: [],
        blood_types: ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'],
        types: [
          {code: 'G', desc: 'Guest'},
          {code: 'SC', desc: 'Senior Citizen'}
        ],
        menu: false,
        modal: false,
        menu2: false,
        first_name: "",
        middle_name: "",
        last_name:"",
        name_suffix: "",
        sex: "M",
        birthday: new Date().toISOString().substr(0, 10),
        blood_type: "",
        type: 'G',
        active: 0,
        address: ''
    }),
    methods: {
      insertPatient(){
        this.isLoading = true;

        if (this.type.code == 'D' || this.type.code == 'A' || this.type.code == 'M') {
          this.active = 1;
        }

        var age = moment().format("YYYY") - moment(new Date(this.birthday)).format("YYYY");
        this.type = (age >= 60 ? 'SC' : 'G');

        axios.post('/api/users',{
          first_name: this.first_name,
          last_name: this.last_name,
          middle_name: this.middle_name,
          name_suffix: this.name_suffix,
          blood_type: this.blood_type,
          sex: this.sex,
          birthday: moment(new Date(this.birthday)).format("YYYY-MM-DD"),
          type: this.type,
          active: this.active,
          address: this.address
        })
        .then((res) => {
          this.dialog = false;
          this.isLoading = false;
          this.isSuccessDialog = true;
          //alert(this.first_name+" added successfully");
          this.$emit('new-user-added');
          
          this.first_name = "";
          this.middle_name = "";
          this.last_name = "";
          this.name_suffix = "";
          this.sex= "M";
          this.birthday = new Date().toISOString().substr(0, 10);
          this.blood_type =  "";
          this.type = {code: 'G', desc: 'Guest'};
          this.active= 0;   
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
