<template>
  <div>
    <div class="tvShowHeading">
      <img
        src="../assets/youtube.png"
        width="50"
        height="30"
        style="padding-left: 5px; padding-top: 10px; cursor: pointer"
      />
      <span>TV SHOWS</span>
      <input
        type="text"
        size="58"
        v-model="searchInput"
        placeholder="Search..."
        style="margin-left: 450px; position: absolute; margin-top: 15px"
        v-show="searchBar"
        data-searchInput
      />
      <img
        src="../assets/search.jpg"
        width="30"
        height="25"
        @click="openSearchField"
        style="
          float: right;
          margin-right: 15px;
          margin-top: 14px;
          cursor: pointer;
        "
      />
    </div>
    <div class="tvShowsActionData">
      <h2>Action</h2>
      <div class="listOfShows">
        {{ filterByAction }}
        <div v-for="item in filterByAction" :key="item">
          <div class="card">
            <img
              class="mySlides"
              @click="openDetailsPage(item.id)"
              :src="item.image.medium"
              height="130"
              width="170"
              style="cursor: pointer"
            />
            <div class="container">
              <h4 style="padding-top: 7px">
                <b>{{ item.name }}</b>
              </h4>
              <p>
                {{ item.rating.average }}
                <i style="color: red" class="fa-solid fa-star"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="Arrows">
        <i
          id="Prev"
          class="fa fa-chevron-left fa-1x"
          aria-hidden="true"
          @click="nextSlide"
          style="cursor: pointer"
        ></i>
        <i
          id="Next"
          class="fa fa-chevron-right fa-1x"
          aria-hidden="true"
          @click="prevSlide"
          style="cursor: pointer"
        ></i>
      </div>
    </div>
    <div class="tvShowsAdventureData">
      <h2>Adventure</h2>
      <div class="listOfShows">
        <div v-for="item in filterByAction" :key="item.id">
          <div class="card">
            <img
              @click="openDetailsPage(item.id)"
              :src="item.image.medium"
              height="140"
              width="170"
              style="cursor: pointer"
            />
            <div class="container">
              <h4 style="padding-top: 7px">
                <b>{{ item.name }}</b>
              </h4>
              <p>
                {{ item.rating.average
                }}<i style="color: red" class="fa-solid fa-star"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="Arrows">
        <i id="Prev" class="fa fa-chevron-left fa-1x" aria-hidden="true"></i>
        <i id="Next" class="fa fa-chevron-right fa-1x" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TvMaze",
  data() {
    return {
      message: "My first VueJS Task",
      searchInput: "",
      tvShows: [],
      showItem: "",
      showDetails: "",
      name: "",
      details: "",
      searchBar: false,
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
    filterByAction() {
      return this.tvShows.filter((item) => {
        item.genres.filter((aItem) => {
          if (aItem === "Action") {
            return item;
          }
        });
      });
    },
    filterByAdventure() {
      return this.tvShows.filter((item) => {
        item.genres.filter((aItem) => {
          if (aItem === "Adventure") {
            return item;
          }
        });
      });
    },
  },
  async created() {
    try {
      const response = await axios.get("https://api.tvmaze.com/shows");
      this.tvShows = response.data;
      this.tvShows.sort(
        (a, b) => Number(b.rating.average) - Number(a.rating.average)
      );
      console.log(this.tvShows, "tvMaze..page..data");
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
    openSearchField() {
      console.log(this.filterByAction, "filterByAction...");
      this.searchBar = !this.searchBar;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tvShowHeading {
  height: 55px;
  width: 95%;
  background-color: darkslategray;
  color: white;
  margin-left: 30px;
  margin-top: -8px;
}
.tvShowHeading span {
  margin-left: 20px;
  font-size: 40px;
}
.tvShowsActionData {
  margin-left: 65px;
}
.tvShowsActionData h2 {
  text-decoration: underline;
  text-decoration-color: rgb(98, 117, 117);
  color: lightslategray;
}
.tvShowsAdventureData {
  margin-left: 65px;
}
.tvShowsAdventureData h2 {
  text-decoration: underline;
  text-decoration-color: rgb(98, 117, 117);
  color: lightslategray;
}
.listOfShows {
  margin-left: 35px;
  display: flex;
  width: 91%;
  overflow-x: hidden;
  position: relative;
}
.card {
  width: 170px;
  margin-right: 10px;
  height: 189px;
}
.card img {
  width: 100%;
  height: 89%;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  text-align: center;
  font-size: 14px;
  padding: 0px 16px;
  margin-top: -81px;
  color: white;
  background-color: #1c1d21;
  transform: translate(0%, 0%);
  height: 60px;
}
.Arrows {
  display: flex;
  justify-content: space-between;
  height: 20px;
  position: absolute;
  margin-top: -9%;
  width: 93%;
  color: gray;
  margin-left: -2%;
}

#Arrows i {
  background-color: rgba(255, 255, 255, 0.25);
  color: #1c1d21;
  cursor: pointer;
  height: 30px;
  padding: 15px;
  transition: background-color 0.5s, color 0.5s;
}

#Arrows i:first-of-type {
  padding-right: 20px;
}

#Arrows i:last-of-type {
  padding-left: 20px;
}

#Arrows i:hover {
  background-color: rgba(28, 29, 33, 0.75);
  color: #eeeff7;
}
.mySlides {
  display: none;
}
</style>
