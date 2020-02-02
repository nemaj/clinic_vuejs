<template>
  <v-toolbar
    dark
    color="red"
  >
    <!--v-toolbar-title>{{ select }}</v-toolbar-title-->
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-3"
      flat
      hide-no-data
      hide-details
      label="Search Generic"
      solo-inverted
      item-text="name"
      item-value="id"
      return-object
    ></v-autocomplete>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </v-toolbar>
</template>

<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";

  export default {
    props: ['generic'],
    components: {
      ErrorAlert
    },
    data () {
      return {
        loading: false,
        isErrorDialog: false,
        errors: [],
        items: [{id: 0, name: 'All Generics'}],
        search: null,
        select: 0
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
      select (val) {
        this.$emit('generic-selected', val);
      },
      generic(val){
        if (val.id) {
          this.select = val;
          this.items.unshift(val);
        }
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        axios.get('/api/generics?filter[name]='+v+'&sort=name')
        .then((res) => {
            res.data.data.unshift({id: 0, name: 'All Generics'});

            this.loading = false;
            this.items = res.data.data;
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