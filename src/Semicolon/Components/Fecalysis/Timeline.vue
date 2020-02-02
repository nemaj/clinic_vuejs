<template>
<v-timeline>
  <v-timeline-item v-for="(result, i) in latestResults" :key="i" color="white" medium>
    <template v-slot:icon>
      <font-awesome-icon icon="poop" style="color:#a5682a;" size="2x" />
    </template>
    <template v-slot:opposite>
      <span class="headline font-weight-bold">{{ moment(new Date(result.created_at), "YYYYMMDD").fromNow() }}</span>
    </template>
    <div>
      <div class="widget-content-right widget-content-actions">
        <button class="ml-5 btn-icon btn-icon-only btn btn-primary btn-sm" title="View" @click="view(result.id)">
          <i class="pe-7s-glasses btn-icon-wrapper"></i>
        </button>
        <!--button class="mr-1 btn-icon btn-icon-only btn btn-secondary btn-sm"><i class="pe-7s-gym btn-icon-wrapper"> </i></button>
        <button class="btn-icon btn-icon-only btn btn-success btn-sm"><i class="pe-7s-umbrella btn-icon-wrapper"> </i></button-->
      </div>
    </div>
  </v-timeline-item>
</v-timeline>
</template>
<script>
import { axios } from '@/plugins/axios';
import moment from 'moment';
  
export default {
  props: ['results'],
  data: () => ({
    moment: moment,
    local_results: []
  }),
  methods: {
    view(id){
      this.$emit('view-log', id);
    }
  },
  watch: {
    results: function(val) {
      this.local_results = this.results;
    }
  },
  computed: {
    latestResults() {
        return this.local_results.slice().reverse();
    }     
  }
}
</script>