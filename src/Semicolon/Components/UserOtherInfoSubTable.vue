<template>
<div>
	<v-timeline dense clipped v-if="hasRecord">
      	<v-timeline-item class="mb-4" hide-dot>
	      	<b-row>
			    <b-col><strong>Created</strong></b-col>
			    <b-col><strong>Complain</strong></b-col>  
			    <b-col><strong>Height</strong></b-col>
			    <b-col><strong>Weight</strong></b-col>
			    <b-col><strong>Blood Pressure</strong></b-col>
			    <b-col><strong>Heart Rate</strong></b-col>
			    <b-col><strong>Temperature</strong></b-col>
			    <b-col><strong>Uploads</strong></b-col>
		  	</b-row>
     	 </v-timeline-item>

      	<v-timeline-item class="mb-4" small v-for="(info, index) in user_other_infos" :color="timelineDotColor(index)">
	      	<b-row>
			    <b-col class="border-bottom border-primary">
			    	{{ moment(new Date(info.created_at), "YYYYMMDD").fromNow() }}
			    </b-col>
			   	<b-col class="border-bottom border-primary">{{ info.complain }}</b-col>  
			    <b-col class="border-bottom border-primary">{{ info.height }}</b-col>
			    <b-col class="border-bottom border-primary">{{ info.weight }}</b-col>
			    <b-col class="border-bottom border-primary">{{ info.blood_pressure }}</b-col>
			    <b-col class="border-bottom border-primary">{{ info.heart_rate }}</b-col>
			    <b-col class="border-bottom border-primary">{{ info.temperature }}</b-col>
			    <b-col class="border-bottom border-primary">
			    	<a :href="uploadPageURL+info.id" target="_blank">View</a>
			    </b-col>
		  	</b-row>	
    	</v-timeline-item>  

    	<div class="text-center" v-show="!isLastPage">
        	<b-button size="sm" class="bg-primary" @click="counter += 1">LOAD MORE</b-button>
    	</div>
    </v-timeline>
	<div v-else>
  		<div class="text-center" v-show="isLoading">
            <img src="@/assets/images/loading.gif" class="img-fluid" />
        </div>
		<v-alert text type="error" v-show="!isLoading" color="red darken-1">
    		No User Other Info for User {{ local_user_id }}
      	</v-alert>
  	</div>

  	<error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
 </div>
</template>
<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
import ErrorAlert from '../Components/Alerts/Error';

export default {
	components: { ErrorAlert },
	props: ['user_id'],
	data: () => ({
	  uploadPageURL:'/user-other-infos/uploads/',
	  moment: moment,
      local_user_id: 0,
      user_other_infos: [],
      hasRecord: false,
      isLoading: false,
      isErrorDialog: false,
      errors: [],
      counter: 1,
      last_page: 0,
      isLastPage: false,
      isMounted: true
    }),
    computed: {
    	timelineDotColor () {
      		return index => index  % 2 === 0 ? 'red' : 'purple';
    	}
  	},
    mounted(){
     	this.local_user_id = this.user_id; 
     	this.getUserOtherInfo();
    },
    methods: {
    	getUserOtherInfo(){		
	     	this.isLoading = true;
	      	
	      	var params = 'filter[user_id]='+this.local_user_id+'&sort=-created_at&rows_per_page=3&page='+this.counter;

	      	axios.get('/api/user_other_infos?'+params)
		    .then((res) => {
		        //console.log(res.data);
		        this.isLoading = false;

		        this.last_page = res.data.meta.last_page;

		        if (this.isMounted) {
		        	this.isLastPage = (this.last_page == 1 ? true : false);	
		        }

		        if (res.data.data.length) {
		        	this.hasRecord = true;

		        	for (var i = 0; i < res.data.data.length; i++) {
		        		this.user_other_infos.push({
		        			id: res.data.data[i].id,
		        			complain: res.data.data[i].complain,
		        			height: res.data.data[i].height,
		        			weight: res.data.data[i].weight,
		        			created_at: res.data.data[i].created_at,
		        			blood_pressure: res.data.data[i].blood_pressure,
		        			heart_rate: res.data.data[i].heart_rate,
		        			temperature: res.data.data[i].temperature
		        		});	
		        	}
		        } else {
		        	this.hasRecord = false;
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
    },
    watch:{
    	counter(val){
    		this.isMounted = false;
    		
    		this.getUserOtherInfo();

    		this.isLastPage = (val == this.last_page ? true : false);
    	},
    	user_id(val) {
    		this.user_other_infos = [];//eto lang ung fix na ginawa ko.
    		this.local_user_id = val;
			this.getUserOtherInfo();    		
    	}
    }
}
</script>