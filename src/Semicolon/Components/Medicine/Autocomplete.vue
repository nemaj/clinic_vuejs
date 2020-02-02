<template>
  <v-toolbar
    dark
    color="teal"
  >
    <!--v-toolbar-title>{{ select }}</v-toolbar-title-->
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="mx-3"
      flat
      hide-no-data
      hide-details
      :label="label"
      solo-inverted
      item-text="name_and_stocks"
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
    props: ['generic'],
    data () {
      return {
        loading: false,
        isErrorDialog: false,
        errors: [],
        items: [],
        search: null,
        select: null,
        label: 'Search generics',
        local_generic: {id: 0, name: 'Search generics'}
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
      generic(val) {
        this.local_generic = val;

        this.label = 'Search from '+this.local_generic.name;

        this.clearSearch();
      },
      select(val) {
        this.$emit('medicine-selected', val);
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true;
        // Simulated ajax query

        var genericFilter = (this.local_generic.id ? '&filter[generic_id]='+this.local_generic.id : '');

        axios.get('/api/medicines?filter[name]='+v
          +'&sort=name')
        .then((res) => {
            this.loading = false;

            if (res.data.meta.total) {
              this.items = res.data.data;
            } else {
              this.items = [];
              // this.error_message = 'Medicines not found within '+this.local_generic.name;
              // this.isErrorDialog = true;
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
      },
      clearSearch(){
        this.items = [];
        this.select = null;
      }
    }
  }
</script>
