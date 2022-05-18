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
      />
      <img
        src="../assets/search.jpg"
        width="50"
        height="30"
        style="float: right; margin-right: -170px"
      />
    </div>
    <div class="tvShowsActionData">
      <h2>Action</h2>
      <div class="listOfShows">
        <div v-for="item in filterByTerm" :key="item.id">
          <div v-for="diff in item.genres" :key="diff">
            <div v-if="diff === 'Action'">
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
      <h2>Adventure</h2>
      <div class="listOfShows">
        <div v-for="item in filterByTerm" :key="item.id">
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
export default {
  name: "TvShows",
  data() {
    return {
      message: "My first VueJS Task",
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
        return item.name.toLowerCase().includes(this.searchInput);
      });
    },
  },
  created() {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data..");
        data.sort(
          (a, b) => Number(b.rating.average) - Number(a.rating.average)
        );
        this.tvShows = data;
      });
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
