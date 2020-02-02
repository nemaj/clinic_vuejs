<template>
  <div class="find-medicine">
    <v-text-field
      :loading="loading"
      label="Search generics"
      solo
      :clearable="true"
      append-icon="search"
      v-model="search"
      @keyup="getSearchValue(search)"
    ></v-text-field>

    <div class="medicine-results" v-if="show_result">
      <div class="medicine-item" v-for="item in items" :key="item.id" @click="selectMedicine(item)">
        <span class="name">{{ item.name }}</span>
        <span class="badge badge-pill" v-bind:class="getBadgeClass(item.available_stocks)">
          {{ item.available_stocks != 0 ? item.available_stocks_text : 'No more stocks' }}
        </span>
      </div>
    </div>

    <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
  </div>
</template>
<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";

export default {
  components: {
    ErrorAlert
  },
  props: ['generic'],
  data: () => ({
    loading: false,
    isErrorDialog: false,
    errors: [],
    items: [],
    local_generic: '',
    search: '',
    item_selected: false,
    show_result: false,
  }),
  methods: {
    selectMedicine(val) {
      this.search = val.name;
      this.show_result = false;
      this.$emit('medicine-selected', val);
    },
    getSearchValue (v) {
      if (!v) {
        this.show_result = false;
        return;
      }
      this.loading = true;
      // Simulated ajax query

      var genericFilter = (this.local_generic.id ? '&filter[generic_id]='+this.local_generic.id : '');

      axios.get('/api/medicines?filter[name]='+v
        +'&sort=name')
      .then((res) => {
          this.loading = false;

          if (res.data.meta.total) {
            this.items = res.data.data;
            this.show_result = true;
          } else {
            this.items = [];
            this.show_result = false;
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
    getBadgeClass(stock) {
      if (stock >= 31) {
        return ['badge-success'];
      } else if (stock >= 1 && stock <= 20) {
        return ['badge-info'];
      } else if (stock >= 20 && stock <= 30) {
        return ['badge-warning'];
      } else {
        return ['badge-danger'];
      }
    },
    clearSearch(){
      this.items = [];
      this.search = null;
    }
  },
  watch: {
    generic(val) {
      this.local_generic = val;

      this.label = 'Search from '+this.local_generic.name;

      this.clearSearch();
    },
    search(val) {
      if (!val) {
        this.show_result = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .find-medicine {
    position: relative;
    height: 50px;
    // background-color: #009688;
    margin-bottom: 10px;
    // padding: 10px;
    > .medicine-results {
      position: absolute;
      z-index: 9999;
      top: 50px;
      background: #fff;
      width: 100%;
      -webkit-box-shadow: 0px 2px 30px 0px rgba(0,0,0,0.4);
      -moz-box-shadow: 0px 2px 30px 0px rgba(0,0,0,0.4);
      box-shadow: 0px 2px 30px 0px rgba(0,0,0,0.4);
      max-height: 150px;
      overflow: auto;
      > .medicine-item {
        cursor: pointer;
        padding: 15px 20px;
        &:hover {
          background: rgba(#000, 0.1);
        }
        > span {
          &.name {

          }
          &.badge {
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
