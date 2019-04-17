<template>
<div>
  <div v-if="user">
    <div class="header">
      <!-- <div>
      </div> -->
      <div>
        <h1>{{user.childName}}'s chart</h1>
        <!-- <p>
          <a @click="toggleUpload" class="btn btn-primary">Add an Entry</i></a>
          <a href="#" @click="logout" class="btn btn-primary">Logout</i></a>
        </p> -->
        <div class="content">
          <h3>Add an Entry</h3>
          <form @submit.prevent="addEntry">
            <input v-model="addedDate" placeholder="Date">
            <input v-model="addedDay" placeholder="Day">
            <input v-model="addedWakeUp" placeholder="Wake up time">
            <input v-model="addedDoseTime" placeholder="Time of dose">
            <input v-model="addedAmount" placeholder="amount">
            <input v-model="addedBedTime" placeholder="bed time">
            <input v-model="addedCottonBalls" placeholder="cotton balls">
            <input v-model="addedTantrums" placeholder="number of tantrums">
            <textarea v-model="addedNote" placeholder="notes"></textarea>
            <br>
            <br>
            <button type="submit">Submit</button>
          </form>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Day</th>
                <th scope="col">Wake Up Time</th>
                <th scope="col">Dose Time</th>
                <th scope="col">Amount (mL)</th>
                <th scope="col">Bed Time</th>
                <th scope="col">Number of Cotton Balls</th>
                <th scope="col">Notes</th>
                <th scope="col">Number of tantrums</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in entries" v-bind:key="entry._id">
                <td>{{entry.date}}</td>
                <td>{{entry.day}}</td>
                <td>{{entry.wakeUp}}</td>
                <td>{{entry.doseTime}}</td>
                <td>{{entry.amount}}</td>
                <td>{{entry.bedTime}}</td>
                <td>{{entry.cottonBalls}}</td>
                <td>{{entry.note}}</td>
                <td>{{entry.tantrums}}</td>
                <td><button @click="deleteEntry(entry)" class="delete">Delete</button></td>
              </tr>
              <hr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
    <escape-event @escape="escape"></escape-event>
    <!-- <uploader :show="show" @escape="escape" @upload-finished="uploadFinished" /> -->
    <!-- <image-gallery :photos="photos" /> -->
  </div>
  <div v-else>
    <div class="jumbotron">
      <h1 class="display-4">Oops!</h1>
      <p class="lead">Your not logged in. Go back to Home to register or login</p>
    </div>
  </div>

  <div class="footer">
    <a href="https://github.com/bradley-hales/behavior_2">GitHub</a>
  </div>
</div>
</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import axios from 'axios'
// import Uploader from '@/components/Uploader.vue'
// import ImageGallery from '@/components/ImageGallery.vue'

export default {
  name: 'mypage',
  components: {
    EscapeEvent,
    // Uploader,
    // ImageGallery
  },
  data() {
    return {
      show: false,
      addedDate: '',
      addedDay: '',
      addedWakeUp: '',
      addedDoseTime: '',
      addedAmount: '',
      addedBedTime: '',
      addedCottonBalls: '',
      addedNote: '',
      addedTantrums: '',
      entries: {},
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    // photos() {
    //   return this.$store.state.photos;
    // }
  },
  async created() {
    await this.$store.dispatch("getUser");
    // await this.$store.dispatch("getMyPhotos");
    await this.getEntries();
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
    // toggleUpload() {
    //   this.show = true;
    // },
    // async uploadFinished() {
    //   this.show = false;
    //   try {
    //     this.error = await this.$store.dispatch("getMyPhotos");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getEntries() {
      try {
        console.log("about to get the entries");
        let response = await axios.get("/api/entries");
        console.log("Here are the entries");
        console.log(response.data);
        this.entries = response.data;
        console.log(this.entries[0]);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addEntry() {
      try {
        await axios.post("/api/entries", {
          date: this.addedDate,
          day: this.addedDay,
          wake: this.addedWakeUp,
          dose: this.addedDoseTime,
          amount: parseInt(this.addedAmount, 10),
          bed: this.addedBedTime,
          cotton: parseInt(this.addedCottonBalls, 10),
          note: this.addedNote,
          tantrums: parseInt(this.addedTantrums, 10)
        });
        this.addedDate = '',
          this.addedDay = '',
          this.addedWakeUp = '',
          this.addedDoseTime = '',
          this.addedAmount = '',
          this.addedBedTime = '',
          this.addedCottonBalls = '',
          this.addedNote = '',
          this.addedTantrums = '',
          this.getEntries();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEntry(entry) {
      try {
        axios.delete("/api/entries/" + entry._id);
        this.getEntries();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

.container {
  text-align: center;
  width: auto;
  height: 60px;
  background-color: #c3c6cc;
}

.content input {
  float: left;
}

/* Footer */
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 35px;
  width: 100%;
  background-color: #343a40 !important;
  color: white;
  text-align: center;
}

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
