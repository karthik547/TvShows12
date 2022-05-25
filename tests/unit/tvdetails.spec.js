import { shallowMount } from "@vue/test-utils";
import TvDetails from "@/components/TvDetails";

// const $route = {
//   path: "/tvDetails",
//   hash: "",
//   params: { id: "123" },
// };

// mount(TvDetails, {
//   mocks: {
//     $route,
//   },
// });

let wrapper = null;

describe("MyComponent", () => {
  beforeEach(() => {
    wrapper = shallowMount(TvDetails, {
      mocks: {
        $route: {
          params: {
            id: "id",
            details: "details",
            obj: "obj",
            name: "name",
          },
        },
      },
    });
  });

  it("$route has passed params", () => {
    expect(wrapper.vm.$route.params.id).toMatch("id");
    expect(wrapper.vm.$route.params.details).toMatch("details");
    expect(wrapper.vm.$route.params.obj).toMatch("obj");
    expect(wrapper.vm.$route.params.name).toMatch("name");
  });
});
