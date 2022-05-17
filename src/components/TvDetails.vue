<template>
  <div>
    Details {{ userId }}
    <div>
        <h2>{{name}}</h2>
        <img :src="tvShows1" />
        <p>{{details}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TvDetails",
  props: ["tvShows"],
  data() {
    return {
      details: this.$route.params.details,
      userId: this.$route.params.id,
      tvShows1: this.$route.params.obj,
      name: this.$route.params.name
    };
  },
};
</script>

<style></style>
