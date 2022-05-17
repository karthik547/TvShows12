<template>
  <div>
    Details {{ userId }}
    <div>
      <h2>Adventure</h2>
      <span v-for="item in tvShows" :key="item.id">
        <span v-for="diff in item.genres" :key="diff">
          <span v-if="diff === 'Adventure' && item.id == userId">
            <span class="card">
              <div>{{ item.summary}}</div>
              <img :src="item.image.medium" />
              <div class="container">
                <h4>
                  <b>{{ item.name }}</b>
                </h4>
                <p>{{ item.rating.average }}</p>
              </div>
            </span>
          </span>
        </span>
      </span>
    </div>
    <div>
      <h2>Action</h2>
      <span v-for="item in tvShows" :key="item.id">
        <span v-for="diff in item.genres" :key="diff">
          <span v-if="diff === 'Action' && item.id == userId">
            <span class="card">
              <div>{{ item.summary}}</div>
              <img :src="item.image.medium" />
              <div class="container">
                <h4>
                  <b>{{ item.name }}</b>
                </h4>
                <p>{{ item.rating.average }}</p>
              </div>
            </span>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TvDetails",
  props: {
    name: String,
    showItem: String,
  },
  data() {
    return {
      details: "",
      userId: this.$route.params.id,
      tvShows: [],
    };
  },
  created: function () {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data..");
        this.tvShows = data;
      });
  },
};
</script>

<style></style>
