import Vue from "vue";
import VueRouter from "vue-router";
import tvDetails from "@/components/tvDetails";

describe("tvDetails.vue", () => {
  it("should totest renders stuff", (done) => {
    Vue.use(VueRouter);
    const router = new VueRouter({
      routes: [{ path: "/shows/:id", name: "tvDetails", component: tvDetails }],
    });
    const vm = new Vue({
      el: document.createElement("div"),
      router: router,
      render: (h) => h("router-view"),
    });
    router.push({ name: "tvDetails", params: { id: 204 } });
    Vue.nextTick(() => {
      console.log("html:", vm.$el);
      expect(vm.$el.querySelector("h2").textContent).to.equal("Stargate SG-1");
      done();
    });
  });
});
