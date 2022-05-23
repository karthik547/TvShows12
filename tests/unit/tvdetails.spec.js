import { mount } from "@vue/test-utils";
import tvDetails from '@/components/tvDetails';

describe('Tv Details',()=>{
    it('details should be render',()=>{
        const wrapper = mount(tvDetails);

        expect(wrapper.text()).toContain();
    })
})