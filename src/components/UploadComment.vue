<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Upload</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <textarea v-model="comment" placeholder="Comment"></textarea>
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Upload</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'UploadComment',
  props: {
    show: Boolean,
    photoID: String,
  },
  data() {
    return {
      comment: '',
      error: '',
    }
  },
  methods: {
    close() {
      this.$emit('escape');
    },
    async upload() {
      try {
        console.log(this.comment);
        console.log(this.photoID);
        const formData = new FormData();
        formData.append('comment', this.comment);
        this.error = await this.$store.dispatch("uploadComment", {
          comment: this.comment,
          photoID: this.photoID,
        });
        if (!this.error) {
          this.comment = '';
          this.$emit('upload-finished');
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>
