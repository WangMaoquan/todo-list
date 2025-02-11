import { mount, VueWrapper } from '@vue/test-utils';
import { defineComponent } from 'vue';
import type { RouterMock } from 'vue-router-mock';

export const useSetup = (setup: () => void) => {
  const comp = defineComponent({
    setup,
    template: '<div></div>',
  });

  const wrapper = mount(comp);

  return wrapper as VueWrapper & RouterMock;
};
