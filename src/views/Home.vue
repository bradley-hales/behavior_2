<template>
<div class="home">
  <!-- <image-gallery :photos="photos" /> -->
  <div class="jumbotron">
    <h1 class="display-4">Hello!</h1>
    <p class="lead">Want an easy way to track your childs behavior?</p>
    <hr class="my-4">
    <p>Sign up for an account or Login below</p>
    <router-link to="/register" class="btn btn-primary">Register</router-link> or
    <router-link to="/login" class="btn btn-primary">Login</router-link>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import ImageGallery from '@/components/ImageGallery.vue'
import EscapeEvent from '@/components/EscapeEvent.vue'
// import Uploader from '@/components/Uploader.vue'

export default {
  name: 'home',
  components: {
    EscapeEvent,
    // Uploader,
    // ImageGallery
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyPhotos");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.jumbotron {
  text-align: center;
}

.btn {
  text-align: center;
}

.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  /* text-align: center; */
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>
