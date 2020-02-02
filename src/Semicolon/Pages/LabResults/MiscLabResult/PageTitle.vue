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
        <b-form-group horizontal label="Search Name" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search Name" @keyup="onFiltered" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="clearFilter">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
      </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
      icon: String,
      heading: String,
      subheading: String,
  },
  data: () => ({
    filter: ''
  }),
  methods: {
    clearFilter(){
      this.filter = '';
      this.$emit('search-user', this.filter);
    },
    onFiltered(){
      this.$emit('search-user', this.filter);
    }
  }    
}
</script>
