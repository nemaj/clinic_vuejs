<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
    <b-row>
      <b-col md="12">
        <b-card title="Basic" class="main-card mb-3">
          <vue-dropzone id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  import PageTitle from "../../../Layout/Components/PageTitle.vue";
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'

  export default {
    components: {
      PageTitle,
      vueDropzone: vue2Dropzone
    },
    data: () => ({
      heading: 'Dropzone',
      subheading: 'Create drag & drop zones for uploading files.',
      icon: 'pe-7s-ticket icon-gradient bg-happy-fisher',


      dropzoneOptions: {
        url: 'http://staging-semicv2-api.tk/api/uploads',
        method: 'POST',
        paramName: "file",
        //thumbnailWidth: 150,
        params: {uploadable_id: 3, uploadable_type: "App\\User"},
        //maxFilesize: 0.5,
        //headers: { "My-Awesome-Header": "header value" },
        maxFiles: 1
      }
    }),

    methods: {}
  }
</script>
