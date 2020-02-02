import Vue from 'vue'
import './plugins/vuetify'
//import VueAxios from './plugins/axios'
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faMale,
    faFemale,
    faUserMd,
    faBlind,
    faCrown,
    faUserNinja,
    faCashRegister,
    faLaptopMedical,
    faUserLock,
    faTint,
    faPoop,
    faEye,
    faArrowUp,
    faEnvelope,
    faBriefcase,
    faBirthdayCake,
    faIdCard,
    faPrint,
    faImage,
    faPlus,
    faBandAid
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(
    faMale,
    faFemale,
    faUserMd,
    faBlind,
    faCrown,
    faUserNinja,
    faCashRegister,
    faLaptopMedical,
    faUserLock,
    faTint,
    faPoop,
    faEye,
    faArrowUp,
    faEnvelope,
    faBriefcase,
    faBirthdayCake,
    faIdCard,
    faPrint,
    faImage,
    faPlus,
    faBandAid
);
  
//import axiosApi from 'axios';

/*const axios = axiosApi.create({
    baseURL: 'http://staging-semicv2-api.tk'
});*/

//Use the window object to make it available globally.
//window.axios = axios;
//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.config.productionTip = false;

//Vue.use(VueAxios)
Vue.use(BootstrapVue);

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
