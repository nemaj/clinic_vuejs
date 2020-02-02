<template>
<div>  
  <div class="upload-image" v-if="local_user_other_info_id">
    <vue-dropzone id="upload" :options="config" @vdropzone-complete="$emit('uploaded')"></vue-dropzone>
  </div>
  <h1 v-else class="text-danger">Please add today's user other info before uploading files</h1>
</div>
</template>
<script>
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  components: {
    vueDropzone
  },
  props: ['user_other_info_id'],
  data: () => ({
    local_user_other_info_id: 0,
    config: {
      url: localStorage.getItem("apiURL")+"/api/uploads",
      params: {        
        uploadable_id: 0,
        uploadable_type: "App\\UserOtherInfo"
      },
      headers: {'Cache-Control': null, 'X-Requested-With': null},
      init: function() {
        this.on("success", function(file, response) {
          this.removeFile(file);// This line removes the preview
        })
      }
    }
  }),
  /*mounted(){
    this.local_user_other_info_id = this.user_other_info_id;
  }*/
  watch:{
    user_other_info_id(val){
      this.local_user_other_info_id = val;
      this.config.params.uploadable_id = val;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
