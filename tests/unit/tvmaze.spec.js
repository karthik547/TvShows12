import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import { mount } from '@vue/test-utils'
import {jest} from '@jest/globals';
import TvMaze from "@/components/TvMaze";

describe("TvMaze.vue Implementation Test", () => {

  let wrapper = null;
  // check the name of the component
  //expect(wrapper.vm.$options.name).toMatch('TvMaze');

  //Setup - run before to each unit test
  beforeEach(()=>{
    //render the component
    wrapper = shallowMount(TvMaze,{
      data:{
        message: "",
        searchInput: "",
        tvShows: [],
        showItem: "",
        showDetails: "",
        name: "",
        details: "",
        searchBar: false,
      }
    })
  })

  // TEARDOWN - run after to each unit test
  afterEach(()=>{
    wrapper.destroy();
  })

  //Data check
  it('initializes with correct elements',()=>{
    //check span is rendered
    expect(wrapper.findAll('span').text()).toMatch('TV SHOWS')
    //check h2 is rendered
    expect(wrapper.findAll('h2').text()).toMatch('Action')
    expect(wrapper.findAll('h2').text()).toMatch('Adventure')

  })

  it('processes valid data',()=>{
    // Update the data passed to render component

  })

  jest.mock("axios", () => ({
    get: () => Promise.resolve({ data: [{ id: 1 }] })
  }));

  //api call
  it("mocking the axios call to get data should work", async () => {
    var wrapper = shallowMount(TvMaze);
    await flushPromises();
    expect(wrapper.vm.tvMaze).toBe(JSON.stringify())
  });

  //Image details click function
  it('calls image details when the image is clicked', async () => {
    const wrapper = mount(TvMaze)
    const imageC = wrapper.find('img').trigger('click')
    expect(imageC)
  })
});







