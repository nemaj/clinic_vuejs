var apiURL = 'http://staging-semicv2-api.tk';
//var apiURL = 'http://localhost:8000';
//FpcVgagGByyRZWEKzUic

localStorage.setItem("apiURL", apiURL);

import axios_http from 'axios'

// insert all your axios logic here
export const axios = axios_http.create({
    baseURL: apiURL
});

export default {
    install (Vue) {
        Vue.prototype.$axios = axios_http
    }
}