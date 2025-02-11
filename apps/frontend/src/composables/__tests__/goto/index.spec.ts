import { useRouter } from 'vue-router';
import { useGoto } from '../../goto';
import { describe, expect, it, vi } from 'vitest';
import { beforeEach } from 'node:test';

vi.mock('vue-router');

// 1. 抽离出来需要注意 调用前需要 清除上一次的结果
const pushFn = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
vi.mocked(useRouter as () => { push: Function }).mockImplementation(() => {
  return {
    push: pushFn,
  };
});

describe('goto', () => {
  beforeEach(() => {
    // 5.
    pushFn.mockClear();
  });

  it('gotoHome', () => {
    const { gotoHome } = useGoto();

    gotoHome();

    expect(pushFn).toBeCalled();
    expect(pushFn).toBeCalledWith({
      name: 'Home',
    });
  });

  it('gotoSettings', () => {
    // 4. 或者使用 pushFn.mockClear();
    // pushFn.mockClear();
    const { gotoSettings } = useGoto();

    gotoSettings();

    expect(pushFn).toBeCalled();
    // 2. 如果没有清除下面的调用也是通过的
    // expect(pushFn).toBeCalledWith({
    //   name: 'Home',
    // });
    // 3. 或者使用  toHaveBeenLastCalledWith 来保证是最新的一次
    expect(pushFn).toHaveBeenLastCalledWith({
      name: 'Settings',
    });
  });

  it('gotoSettingsTheme', () => {
    const { gotoSettingsTheme } = useGoto();

    gotoSettingsTheme();

    expect(pushFn).toBeCalledWith({
      name: 'SettingsTheme',
    });
  });
});
