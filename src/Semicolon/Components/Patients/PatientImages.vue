<template>
<div>
  <div class="text-center" v-show="isLoading">
    <img src="@/assets/images/loading.gif" class="img-fluid" />
  </div>
  <div v-show="!isLoading">
    <div class="patient-images" v-if="totalFilesToday">
      <div class="image-preview">
        <div class="card-carousel text-center">
          <a :href="site+selectedImage.url" target="_blank">
            <v-btn class="mx-2" fab small color="red">
              <font-awesome-icon icon="eye" title="View Larger Image" size="2x" />
            </v-btn>
          </a>
        </div>
        <img :src="site+selectedImage.url" style="width: 100%" />
      </div>
      <div class="card-carousel-wrapper">
        <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
        <div class="card-carousel">
          <div class="card-carousel--overflow-container">
            <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
              <div class="card-carousel--card" v-for="item in items" @click="selectImage(item)">
                <img :src="site+item.url" class="img-responsive" style="width: 200px;" />
                <!--div class="card-carousel--card--footer">
                  <p>{{ item.name }}</p>
                  <p>{{ item.tag }}</p>
                </div--> 
              </div>
            </div>
          </div>
        </div>
        <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
      </div>
    </div>
    <h1 v-else class="text-danger">No uploaded files for this patient this day.</h1>
  </div>
  <error-alert v-model="isErrorDialog" :errors="errors"></error-alert>
</div>
</template>
<script>
import { axios } from '@/plugins/axios';
import ErrorAlert from "../../Components/Alerts/Error.vue";

export default {
  components: { ErrorAlert },
  props: ['user_other_info_id', 'is_refresh_carousel'],
  data: () => ({
    site: localStorage.getItem("apiURL")+'/storage',
    local_user_other_info_id: 0,
    isLoading: false,
    isErrorDialog: false,
    errors: [],
    selectedImage: {},
    currentOffset: 0,
    windowSize: 3,
    paginationFactor: 220,
    items: [],
    totalFilesToday: 0
  }),
  mounted(){
    if (this.$route.params.user_other_info_id) {
      this.local_user_other_info_id = this.$route.params.user_other_info_id;
      this.getImages();
    }
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    }
  },
  methods: {
    getImages(){
      this.isLoading = true;

      var params = "filter[uploadable_id]="+this.local_user_other_info_id
                  +"&filter[uploadable_type]=App\\UserOtherInfo"
                  +"&sort=-created_at"
                  +"&rows_per_page=10";

      axios.get('/api/uploads?'+params)
      .then((res) => {
        this.isLoading = false;
        this.items = res.data.data;
        this.selectedImage = this.items[0];
        this.totalFilesToday = res.data.data.length;
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
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    selectImage(item) {
      this.selectedImage = item;
    }
  },
  watch:{
    user_other_info_id(val){
      this.local_user_other_info_id = val;
      this.getImages();
    },
    is_refresh_carousel(val){
      if (val) {
        this.getImages();
        this.$emit('doneRefresh');  
      }
    }
  }
}
</script>
