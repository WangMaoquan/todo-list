import { useGoto, openGithub, GITHUB_URL } from '../../goto';
import { describe, expect, it, vi } from 'vitest';
import { useSetup } from '@/tests/helpers';

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
    // const comp = defineComponent({
    //   setup() {
    //     const { gotoHome } = useGoto();

    //     gotoHome();
    //   },
    //   template: '<div></div>',
    // });
    const wrapper = useSetup(() => {
      const { gotoHome } = useGoto();

      gotoHome();
    });
    expect(wrapper.router.push).toBeCalledWith({
      name: 'Home',
    });
  });

  it('gotoSettings', () => {
    const wrapper = useSetup(() => {
      const { gotoSettings } = useGoto();

      gotoSettings();
    });
    expect(wrapper.router.push).toBeCalledWith({
      // name: 'Home', // 没有清除缓存 也会通过
      name: 'Settings',
    });
  });

  it('gotoSettingsTheme', () => {
    const wrapper = useSetup(() => {
      const { gotoSettingsTheme } = useGoto();

      gotoSettingsTheme();
    });
    expect(wrapper.router.push).toBeCalledWith({
      name: 'SettingsTheme',
    });
  });

  describe('window.open', () => {
    it('openGithub', () => {
      const openFn = (window.open = vi.fn());

      openGithub();

      expect(openFn).toBeCalled();
      expect(openFn).toBeCalledWith(GITHUB_URL);
    });
  });
});
