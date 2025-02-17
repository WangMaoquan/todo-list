import { fireEvents, useSetup } from '@/tests/helpers';
import { useCommandModal } from '../../command';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed } from 'vue';
import * as useIsMac from '../../useIsMac';

// 1. 可以使用 vi.mock 方法 mock useIsMac 但是 很麻烦, 我们可以使用 vi.spyon
// vi.mock('@/composables/useIsMac', () => {
//   return {
//     useIsMac() {
//       return computed(() => true);
//     },
//   };
// });

describe('useCommandModal', () => {
  beforeEach(() => {
    const { closeCommandModal } = useCommandModal();
    // 需要重置 showCommandModal 状态
    closeCommandModal();
  });

  it('should open modal', () => {
    const { showCommandModal, openCommandModal } = useCommandModal();

    openCommandModal();

    expect(showCommandModal.value).toBe(true);
  });

  it('should close modal', () => {
    const { showCommandModal, closeCommandModal } = useCommandModal();

    closeCommandModal();

    expect(showCommandModal.value).toBe(false);
  });

  it('show open the modal when press cmd+k on Mac', () => {
    // 这样就方便了
    vi.spyOn(useIsMac, 'useIsMac').mockReturnValue(computed(() => true));

    const { showCommandModal, registerKeyboardShortcut } = useCommandModal();

    // 生命周期钩子需要在 setup 中调用
    const wrapper = useSetup(() => registerKeyboardShortcut());

    fireEvents.keyDown({
      key: 'k',
      metaKey: true,
    });

    expect(showCommandModal.value).toBe(true);

    // 记得注销事件
    wrapper.unmount();
  });

  it('show open the modal when press ctrl+k on Win', () => {
    // 这样就方便了
    vi.spyOn(useIsMac, 'useIsMac').mockReturnValue(computed(() => false));

    const { showCommandModal, registerKeyboardShortcut } = useCommandModal();

    // 生命周期钩子需要在 setup 中调用
    const wrapper = useSetup(() => registerKeyboardShortcut());

    fireEvents.keyDown({
      key: 'k',
      ctrlKey: true,
    });

    expect(showCommandModal.value).toBe(true);

    // 记得注销事件
    wrapper.unmount();
  });
});
