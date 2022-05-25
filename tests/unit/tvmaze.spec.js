import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import { jest } from "@jest/globals";
import TvShows from "@/components/TvShows";

jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: [{ val: 1 }] }),
}));

describe("TvMaze.vue Implementation Test", () => {
  //api call
  test("mocking the axios call to get TvShows should work", async () => {
    var wrapper = shallowMount(TvShows);
    await flushPromises();
    expect(wrapper.vm.tvShows.length).toBe(1);
  });

  let wrapper = null;

  it("has tvShowHeading class", () => {
    expect(wrapper.contains(".tvShowHeading")).toBe(true);
  });

  it("has heading values", () => {
    expect(wrapper.find("span").text()).toBe("TV SHOWS");
    expect(wrapper.find("span").text()).toBe("TV SHOWS");
    expect(wrapper.find("span").text()).toBe("TV SHOWS");
  });

  //check the data properties of the component
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(TvShows, {
      // Create a shallow instance of the component
      data: {
        tvShows: [{ name: "Stargate SG-1" }],
        showItem: 204,
        name: "Stargate SG-1",
        details: "stargate is action film",
      },
    });
  });

  it("equals messages to", () => {
    // Within cmp.vm, we can access all Vue instance methods
    expect(cmp.vm.tvShows).toEqual([{ name: "Stargate SG-1" }]);
    expect(cmp.vm.showItem).toEqual(204);
    expect(cmp.vm.details).toEqual("stargate is action film");
    expect(cmp.vm.name).toEqual("Stargate SG-1");
  });

  //Image details click function
  it("calls image details when the image is clicked", async () => {
    const wrapper = shallowMount(TvShows);
    const imageC = wrapper.find("img").trigger("click");
    expect(imageC);
  });

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy();
  });
});
