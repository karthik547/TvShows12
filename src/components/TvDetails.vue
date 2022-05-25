<template>
  <div>
    Details {{ userId }}
    <div>
      <h2>{{ name }}</h2>
      <img :src="obj" />
      <p>{{ details }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TvDetails",
  data() {
    return {
      details: this.$route.params.details,
      userId: this.$route.params.id,
      obj: this.$route.params.obj,
      name: this.$route.params.name,
    };
  },
};
</script>

<style></style>
