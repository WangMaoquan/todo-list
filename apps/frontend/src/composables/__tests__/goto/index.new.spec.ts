import { useGoto } from '../../goto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
} from 'vue-router-mock';
import { config, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

// mock router 这一块都可以提取到 setup 里面
// 创建
// const router = createRouterMock({
//   spy: {
//     create: (fn) => vi.fn(fn), // 使用什么去通知 类似我们的 pushFn
//     reset: (spy) => spy.mockClear(), // 清除mock 的缓存
//   },
// });

// // install
// config.plugins.VueWrapper.install(VueRouterMock);

describe('use vue-router-mock', () => {
  // beforeEach(() => {
  //   router.reset();
  //   injectRouterMock(router);
  // });

  it('gotoHome', () => {
    const comp = defineComponent({
      setup() {
        const { gotoHome } = useGoto();

        gotoHome();
      },
      template: '<div></div>',
    });

    const wrapper = mount(comp);
    // console.log(wrapper.router);
    expect(wrapper.router.push).toBeCalledWith({
      name: 'Home',
    });
  });

  it('gotoSettings', () => {
    const comp = defineComponent({
      setup() {
        const { gotoSettings } = useGoto();

        gotoSettings();
      },
      template: '<div></div>',
    });

    const wrapper = mount(comp);
    expect(wrapper.router.push).toBeCalledWith({
      // name: 'Home', // 没有清除缓存 也会通过
      name: 'Settings',
    });
  });

  it('gotoSettingsTheme', () => {
    const comp = defineComponent({
      setup() {
        const { gotoSettingsTheme } = useGoto();

        gotoSettingsTheme();
      },
      template: '<div></div>',
    });

    const wrapper = mount(comp);
    expect(wrapper.router.push).toBeCalledWith({
      name: 'SettingsTheme',
    });
  });
});
