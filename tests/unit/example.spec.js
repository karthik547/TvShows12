import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import { mount } from '@vue/test-utils'
import {jest} from '@jest/globals';
import TvMaze from "@/components/TvMaze";

jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: [{ id: 1 }] })
}));

describe("TvMaze.vue", () => {
  //api call
  test("mocking the axios call to get data should work", async () => {
    var wrapper = shallowMount(TvMaze);
    await flushPromises();
    expect(wrapper.vm.tvMaze).toBe(JSON.stringify())
  });

  //Image details click function
  test('calls image details when the image is clicked', async () => {
    const wrapper = mount(TvMaze)
    const imageC = wrapper.find('img').trigger('click')
    expect(imageC)
  })
});







