<template>
<div>	
<b-button-group buttons class="btn-pill btn-dashed" button-variant="outline-primary" size="lg">
  <b-button variant="primary" @click="changeTab('fecalysis')" v-show="tab== 'fecalysis'">
    Fecalysis 
    <b-badge pill variant="danger" v-show="totalUnreadFecalysis">{{ totalUnreadFecalysis }}</b-badge>
  </b-button>
  <b-button variant="outline-primary" @click="changeTab('fecalysis')" v-show="tab!= 'fecalysis'">
    Fecalysis 
    <b-badge pill variant="danger" v-show="totalUnreadFecalysis">{{ totalUnreadFecalysis }}</b-badge>
  </b-button>

  <b-button variant="primary" @click="changeTab('urinalysis')" v-show="tab=='urinalysis'">
    Urinalysis 
    <b-badge pill variant="danger" v-show="totalUnreadUrinalysis">{{ totalUnreadUrinalysis }}</b-badge>
  </b-button>
  <b-button variant="outline-primary" @click="changeTab('urinalysis')" v-show="tab!='urinalysis'">
    Urinalysis 
    <b-badge pill variant="danger" v-show="totalUnreadUrinalysis">{{ totalUnreadUrinalysis }}</b-badge>
  </b-button>

  <b-button variant="primary" @click="changeTab('hematology')" v-show="tab=='hematology'">
    Hematology 
    <b-badge pill variant="danger" v-show="totalUnreadHematology">{{ totalUnreadHematology }}</b-badge>
  </b-button>
  <b-button variant="outline-primary" @click="changeTab('hematology')" v-show="tab!='hematology'">
    Hematology 
    <b-badge pill variant="danger" v-show="totalUnreadHematology">{{ totalUnreadHematology }}</b-badge>
  </b-button>
  
  <b-button variant="primary" @click="changeTab('blood-chemistry')" v-show="tab=='blood-chemistry'">
    Blood Chemistry 
    <b-badge pill variant="danger" v-show="totalUnreadBloodChemistry">{{ totalUnreadBloodChemistry }}</b-badge>
  </b-button>
  <b-button variant="outline-primary" @click="changeTab('blood-chemistry')" v-show="tab!='blood-chemistry'">
    Blood Chemistry 
    <b-badge pill variant="danger" v-show="totalUnreadBloodChemistry">{{ totalUnreadBloodChemistry }}</b-badge>
  </b-button>

  <b-button variant="primary" @click="changeTab('special-test')" v-show="tab=='special-test'">
    Special Test 
    <b-badge pill variant="danger" v-show="totalUnreadSpecialTest">{{ totalUnreadSpecialTest }}</b-badge>
  </b-button>
  <b-button variant="outline-primary" @click="changeTab('special-test')" v-show="tab!='special-test'">
    Special Test 
    <b-badge pill variant="danger" v-show="totalUnreadSpecialTest">{{ totalUnreadSpecialTest }}</b-badge>
  </b-button>

  <b-button variant="primary" @click="changeTab('miscellaneous')" v-show="tab=='miscellaneous'">
    Miscellaneous 
    <b-badge pill variant="danger" v-show="totalUnreadMiscellaneous">{{ totalUnreadMiscellaneous }}</b-badge>
  </b-button>
  <b-button variant="outline-primary" @click="changeTab('miscellaneous')" v-show="tab!='miscellaneous'">
    Miscellaneous 
    <b-badge pill variant="danger" v-show="totalUnreadMiscellaneous">{{ totalUnreadMiscellaneous }}</b-badge>
  </b-button>
</b-button-group>

<error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
</div>
</template>
<script>
if (localStorage.getItem("user")) {
    var loggedUser = JSON.parse(localStorage.getItem("user"));   
} else {
    var loggedUser = {};
}

import { axios } from '@/plugins/axios';
import ErrorAlert from "../Components/Alerts/Error";

export default {
	components:{
    	ErrorAlert
	},
	props:[
		'fecalysisCounter',
		'urinalysisCounter',
		'hematologyCounter', 
		'bloodChemistryCounter',
		'specialTestCounter',
		'miscellaneousCounter',
		'userId'
	],
	data: () => ({
		isErrorDialog: false,
		errors: [],
		isLoading: false,
		tab: 'fecalysis',
		totalUnreadFecalysis: 0,
		totalUnreadUrinalysis: 0,
		totalUnreadHematology: 0,
		totalUnreadBloodChemistry: 0,
		totalUnreadSpecialTest: 0,
		totalUnreadMiscellaneous: 0,
		totalReadFecalysis: 0,
		totalReadUrinalysis: 0,
		totalReadHematology: 0,
		totalReadBloodChemistry: 0,
		totalReadSpecialTest: 0,
		totalReadMiscellaneous: 0,
		totalFecalysis: 0,
		totalUrinalysis: 0,
		totalHematology: 0,
		totalBloodChemistry: 0,
		totalSpecialTest: 0,
		totalMiscellaneous: 0,
		local_user_id: 0
	}),
	methods: {
		getTotalUnreadFecalysis(){
			this.totalUnreadFecalysis = this.totalFecalysis - this.totalReadFecalysis;
		},
		getTotalUnreadUrinalysis(){
			this.totalUnreadUrinalysis = this.totalUrinalysis - this.totalReadUrinalysis;
		},
		getTotalUnreadHematology(){
			this.totalUnreadHematology = this.totalHematology - this.totalReadHematology;
		},
		getTotalUnreadBloodChemistry(){
			this.totalUnreadBloodChemistry = this.totalBloodChemistry - this.totalReadBloodChemistry;
		},
		getTotalUnreadSpecialTest(){
			this.totalUnreadSpecialTest = this.totalSpecialTest - this.totalReadSpecialTest;
		},
		getTotalUnreadMiscellaneous(){
			this.totalUnreadMiscellaneous = this.totalMiscellaneous - this.totalReadMiscellaneous;
		},
		getTotalMiscellaneous(){
			this.isLoading = true;

			axios.get('api/misc_lab_results?filter[user_id]='+this.local_user_id+'&rows_per_page=1')
		    .then((res) => {
		    	this.totalMiscellaneous = res.data.meta.total;
		    	this.getTotalReadMiscellaneous();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalMiscellaneous = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalSpecialTest(){
			this.isLoading = true;

			axios.get('api/special_test_lab_results?filter[user_id]='+this.local_user_id+'&rows_per_page=1')
		    .then((res) => {
		    	this.totalSpecialTest = res.data.meta.total;
		    	this.getTotalReadSpecialTest();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalSpecialTest = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalBloodChemistry(){
			this.isLoading = true;

			axios.get('api/blood_chemistries?filter[user_id]='+this.local_user_id+'&rows_per_page=1')
		    .then((res) => {
		    	this.totalBloodChemistry = res.data.meta.total;
		    	this.getTotalReadBloodChemistry();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalBloodChemistry = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalHematology(){
			this.isLoading = true;

			axios.get('api/hematologies?filter[user_id]='+this.local_user_id+'&rows_per_page=1')
		    .then((res) => {
		    	this.totalHematology = res.data.meta.total;
		    	this.getTotalReadHematology();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalHematology = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalUrinalysis(){
			this.isLoading = true;

			axios.get('api/urinalyses?filter[user_id]='+this.local_user_id+'&rows_per_page=1')
		    .then((res) => {
		    	this.totalUrinalysis = res.data.meta.total;
		    	this.getTotalReadUrinalysis();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalUrinalysis = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalFecalysis(){
			this.isLoading = true;

			axios.get('api/fecalyses?filter[user_id]='+this.local_user_id+'&rows_per_page=1')
		    .then((res) => {
		    	this.totalFecalysis = res.data.meta.total;
		    	this.getTotalReadFecalysis();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalFecalysis = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalReadMiscellaneous(){
			this.isLoading = true;

			var params = "filter[user_id]="+loggedUser.id+
						 "&filter[seenable_type]=App\\MiscLabResult"+
						 "&filter[seenable_user_id]="+this.local_user_id;

			axios.get('api/seens?'+params)
		    .then((res) => {
		    	this.totalReadMiscellaneous = res.data.meta.total;
		    	this.getTotalUnreadMiscellaneous();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalReadMiscellaneous = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalReadSpecialTest(){
			this.isLoading = true;

			var params = "filter[user_id]="+loggedUser.id+
						 "&filter[seenable_type]=App\\SpecialTestLabResult"+
						 "&filter[seenable_user_id]="+this.local_user_id;

			axios.get('api/seens?'+params)
		    .then((res) => {
		    	this.totalReadSpecialTest = res.data.meta.total;
		    	this.getTotalUnreadSpecialTest();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalReadSpecialTest = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalReadBloodChemistry(){
			this.isLoading = true;

			var params = "filter[user_id]="+loggedUser.id+
						 "&filter[seenable_type]=App\\BloodChemistry"+
						 "&filter[seenable_user_id]="+this.local_user_id;

			axios.get('api/seens?'+params)
		    .then((res) => {
		    	this.totalReadBloodChemistry = res.data.meta.total;
		    	this.getTotalUnreadBloodChemistry();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalReadBloodChemistry = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalReadHematology(){
			this.isLoading = true;

			var params = "filter[user_id]="+loggedUser.id+
						 "&filter[seenable_type]=App\\Hematology"+
						 "&filter[seenable_user_id]="+this.local_user_id;

			axios.get('api/seens?'+params)
		    .then((res) => {
		    	this.totalReadHematology = res.data.meta.total;
		    	this.getTotalUnreadHematology();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalReadHematology = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalReadUrinalysis(){
			this.isLoading = true;

			var params = "filter[user_id]="+loggedUser.id+
						 "&filter[seenable_type]=App\\Urinalysis"+
						 "&filter[seenable_user_id]="+this.local_user_id;

			axios.get('api/seens?'+params)
		    .then((res) => {
		    	this.totalReadUrinalysis = res.data.meta.total;
		    	this.getTotalUnreadUrinalysis();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalReadUrinalysis = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		getTotalReadFecalysis(){
			this.isLoading = true;

			var params = "filter[user_id]="+loggedUser.id+
						 "&filter[seenable_type]=App\\Fecalysis"+
						 "&filter[seenable_user_id]="+this.local_user_id;

			axios.get('api/seens?'+params)
		    .then((res) => {
		    	this.totalReadFecalysis = res.data.meta.total;
		    	this.getTotalUnreadFecalysis();
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          this.totalReadFecalysis = 0;
	          //this.errors = [];
	          //this.errors.push(error);

	          /*if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		},
		changeTab(tab){
			this.tab = tab;
			this.$emit('clicked', this.tab);
		},
		loadFirst(){
			/*this.getTotalFecalysis();
			this.getTotalUrinalysis();
			this.getTotalHematology();
			this.getTotalBloodChemistry();
			this.getTotalSpecialTest();
			this.getTotalMiscellaneous();*/	
			//localhost:8000/api/seens/logged_user_id/11/user_id/15
			this.isLoading = true;

			axios.get('api/seens/logged_user_id/'+loggedUser.id+'/user_id/'+this.local_user_id)
		    .then((res) => {
				this.totalUnreadFecalysis = res.data.total_unread_fecalysis;
				this.totalUnreadUrinalysis = res.data.total_unread_urinalysis;
				this.totalUnreadHematology = res.data.total_unread_hematology;
				this.totalUnreadBloodChemistry = res.data.total_unread_blood_chemistry;
				this.totalUnreadSpecialTest = res.data.total_unread_special_test_lab_result;
				this.totalUnreadMiscellaneous = res.data.total_unread_misc_lab_result;
		    })
		    .catch((error) => {
	          //this.isErrorDialog = true;
	          this.isLoading = false;
	          //this.totalReadHematology = 0;
	          /*this.errors = [];
	          this.errors.push(error);

	          if (error.response.data.errors !== undefined) {          
	            Object.entries(error.response.data.errors).forEach(
	                ([key, value]) => this.errors.push(value.toString())
	            );
	          }*/
		    });
		}
	},
	mounted(){
		this.local_user_id = this.userId;
		this.loadFirst();
	},
	watch:{
		userId(val){
			this.local_user_id = val;
			this.loadFirst();
		},
		fecalysisCounter(val){
			this.totalUnreadFecalysis--;
		},
		urinalysisCounter(val){
			this.totalUnreadUrinalysis--;
		},
		hematologyCounter(val){
			this.totalUnreadHematology--;
		},
		bloodChemistryCounter(val){
			this.totalUnreadBloodChemistry--;
		},
		specialTestCounter(val){
			this.totalUnreadSpecialTest--;
		},
		miscellaneousCounter(val){
			this.totalUnreadMiscellaneous--;
		}
	}
}
</script>