<template>
  <div>
    <div class="tvShowHeading">
      <img
        src="../assets/youtube.png"
        width="50"
        height="30"
        style="padding-left: 5px; padding-top: 10px"
      />
      <span>TV SHOWS</span>
      <input
        type="text"
        v-model="searchInput"
        placeholder="Search..."
        style="float: right; padding-top: 5px; padding-right: 10px"
        data-test="tvShow-input"
      />
      <img
        src="../assets/search.jpg"
        width="50"
        height="30"
        style="float: right; margin-right: -170px"
      />
      <!-- <i
        class="fa fa-search"
        aria-hidden="true"
        style="float: right; margin-right: 15px; margin-top: 15px"
      ></i> -->
    </div>
    <div class="tvShowsActionData">
      <h2>Action</h2>
      <div class="listOfShows">
        <div v-for="item in tvShows" :key="item.id">
          <div v-for="diff in item.genres" :key="diff">
            <div v-if="diff === 'Action'">
              <div class="card">
                <img
                  @click="openDetailsPage(item.id)"
                  :src="item.image.medium"
                  height="140"
                  width="170"
                />
                <div class="container" data-test="tvShow-names">
                  <h4>
                    <b>{{ item.name }}</b>
                  </h4>
                  <p>{{ item.rating.average }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="prev" onclick="plusSlides(-1)">❮</a>
      <a class="next" onclick="plusSlides(1)">❯</a>
      <h2>Adventure</h2>
      <div class="listOfShows">
        <div v-for="item in tvShows" :key="item.id">
          <div v-for="diff in item.genres" :key="diff">
            <div v-if="diff === 'Adventure'">
              <div class="card">
                <img
                  @click="openDetailsPage(item.id)"
                  :src="item.image.medium"
                  height="140"
                  width="170"
                />
                <div class="container">
                  <h4>
                    <b>{{ item.name }}</b>
                  </h4>
                  <p>{{ item.rating.average }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TvShows",
  data() {
    return {
      searchInput: "",
      tvShows: [],
      showItem: "",
      showDetails: "",
      name: "",
      details: "",
    };
  },
  computed: {
    filterByTerm() {
      return this.tvShows.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.searchInput) ||
          item.name.toUpperCase().includes(this.searchInput)
        );
      });
    },
  },
  async created() {
    try {
      const response = await axios.get("https://api.tvmaze.com/shows");
      this.tvShows = response.data.sort(
        (a, b) => Number(b.rating.average) - Number(a.rating.average)
      );
      console.log(this.tvShows, "this.tvShows...");
    } catch (err) {
      this.error = err;
    }
  },
  methods: {
    openDetailsPage(itemId) {
      var self = this;
      let allTvShows = this.tvShows;
      let tvShow = allTvShows.filter((show) => show.id === itemId);
      tvShow.forEach((item) => {
        self.showItem = item.id;
        self.showDetails = item.image.medium;
        self.name = item.name;
        self.details = item.summary;
      });
      this.$router.push({
        name: "TvDetails",
        params: {
          id: self.showItem,
          obj: self.showDetails,
          name: self.name,
          details: self.details,
        },
      });
    },
    //showSlides(this.slideIndex);
    plusSlides(n) {
      this.showSlides((this.slideIndex += n));
    },
    showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[this.slideIndex - 1].style.display = "block";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tvShowHeading {
  height: 50px;
  width: 95%;
  background-color: darkslategray;
  color: white;
  margin-left: 30px;
}
.tvShowHeading span {
  font-size: 30px;
  margin-left: 20px;
}
.tvShowsActionData {
  margin-left: 50px;
}
.listOfShows {
  margin-left: 20px;
  display: grid;
  grid-auto-flow: column;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 170px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
}
</style>
