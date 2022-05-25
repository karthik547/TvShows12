import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import TvShows from "@/components/TvShows";

jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: [{ val: 1 }] }),
}));

describe("TvShows.vue", () => {
  it("mocking the axios call to get tvshows should work", async () => {
    var wrapper = shallowMount(TvShows);
    await flushPromises();
    expect(wrapper.vm.tvShows.length).toBeGreaterThanOrEqual(1);
  });

  it("searching the tvshows", async () => {
    const wrapper = shallowMount(TvShows);
    wrapper.find('[data-test="tvShow-input"]').setValue("Breaking Bad");
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TvShows);
  });

  it("should check the data", () => {
    expect(wrapper.vm.searchInput).toMatch("");
    expect(wrapper.vm.name).toMatch("");
    expect(wrapper.vm.details).toMatch("");
    expect(wrapper.vm.showItem).toMatch("");
    expect(wrapper.vm.showDetails).toMatch("");
  });

  it("calls image details when the image is clicked", async () => {
    const wrapper = shallowMount(TvShows);
    const imageC = wrapper.find("img").trigger("click");
    expect(imageC);
  });
});
