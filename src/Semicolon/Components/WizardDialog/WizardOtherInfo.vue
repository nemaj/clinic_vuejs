<template>
  <div class="wizard-other-info">
    <user-other-info-sub-table :user_id="local_user_id"></user-other-info-sub-table>
  </div>
</template>
<script>
import UserOtherInfoSubTable from '../../Components/UserOtherInfoSubTable.vue';

export default {
  components: {
    UserOtherInfoSubTable
  },
	props: ['user_id'],
	data: () => ({
    local_user_id: 0,
  }),
  watch: {
    user_id(val) {
      this.local_user_id = this.user_id;
    }
  }
}
</script>