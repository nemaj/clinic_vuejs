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
            
        </div>
      <success-alert v-model="isSuccessDialog">{{ first_name }} added successfully</success-alert>
      <error-alert v-model="isErrorDialog">{{ error_message }}</error-alert>
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
        dialog: false,
        isSuccessDialog: false,
        isErrorDialog: false,
        isLoading: false,
        error_message: '',
        blood_types: ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'],
        types: [
          {code: 'G', desc: 'Guest'},
          {code: 'S', desc: 'Special'},
          {code: 'SC', desc: 'Senior Citizen'},
          {code: 'D', desc: 'Doctor'},
          {code: 'A', desc: 'Assistant'},
          {code: 'M', desc: 'Med Tech'}
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
        type: {code: 'G', desc: 'Guest'},
        active: 0
    }),
    methods: {
      insertPatient(){
        this.isLoading = true;

        if (this.type.code == 'D' || this.type.code == 'A' || this.type.code == 'M') {
          this.active = 1;
        }

        axios.post('/api/users',{
          first_name: this.first_name,
          last_name: this.last_name,
          middle_name: this.middle_name,
          name_suffix: this.name_suffix,
          blood_type: this.blood_type,
          sex: this.sex,
          birthday: moment(new Date(this.birthday)).format("YYYY-MM-DD"),
          type: this.type.code,
          active: this.active
        })
        .then((res) => {
          this.dialog = false;
          this.isLoading = false;
          this.isSuccessDialog = true;
          //alert(this.first_name+" added successfully");
          this.$emit('new-user-added');
        })
        .catch(function (error) {
          //alert(error);
          if (error.response.data.errors !== undefined) {          
            var text = [];

            Object.entries(error.response.data.errors).forEach(
                ([key, value]) => text.push(value)
            );

            var errorMessage = text.toString().replace(/,/g,"\n");
            //alert(text.toString().replace(/,/g,"\n"));
            this.isErrorDialog = true;
            this.error_message = errorMessage;
          }
        });
      }
    }    
}
</script>
