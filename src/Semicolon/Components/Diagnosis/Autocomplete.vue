<template>
  <v-toolbar
    dark
    color="blue"
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
      label="Search Diagnosis"
      solo-inverted
      item-text="name"
      item-value="id"
      return-object
      append-icon="search"
    ></v-autocomplete>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </v-toolbar>
</template>

<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";

  export default {
    components: {
      ErrorAlert
    },
    data () {
      return {
        loading: false,
        isErrorDialog: false,
        errors: [],
        items: [{id: 1, name: 'Pending Diagnosis'}],
        search: null,
        select: 1
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
      select (val) {
        this.$emit('diagnosis-selected', val);
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        axios.get('/api/diagnoses?filter[name]='+v+'&sort=name')
        .then((res) => {
            res.data.data.unshift({id: 1, name: 'Pending Diagnosis'});

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