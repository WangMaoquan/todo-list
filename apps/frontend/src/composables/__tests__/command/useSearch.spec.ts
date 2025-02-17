import { useSearch } from '@/composables/command';
import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * 独居测试时, 只需要把依赖全部使用间谍就好
 */
const searchCommands = vi.fn();
const resetSearchCommands = vi.fn();
vi.mock('@/composables/command/useSearchCommands', () => {
  return {
    useSearchCommands() {
      return {
        searchCommands,
        resetSearchCommands,
      };
    },
  };
});

const searchTasks = vi.fn();
const resetSearchTasks = vi.fn();
vi.mock('@/composables/command/useSearchTasks', () => {
  return {
    useSearchTasks() {
      return {
        searchTasks,
        resetSearchTasks,
      };
    },
  };
});

describe('useSearch', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    // 全局变量需要重置状态
    const { resetSearch } = useSearch();
    resetSearch();

    await vi.runAllTimersAsync();

    // 记住需要清除缓存
    searchCommands.mockClear();
    resetSearchCommands.mockClear();
    searchTasks.mockClear();
    resetSearchTasks.mockClear();
  });

  it('should be loading is true when search start', async () => {
    const { loading, search } = useSearch();

    // 有异步操作
    search.value = 'todo';
    await vi.advanceTimersToNextTimerAsync();
    expect(loading.value).toBe(true);
  });

  it('should be loading is false when search complete', async () => {
    const { loading, search } = useSearch();

    // 有异步操作
    search.value = 'todo';
    // 跳过所有的 promise timer
    await vi.runAllTimersAsync();
    expect(loading.value).toBe(false);
  });

  it('should be searching is true when search complete', async () => {
    const { searching, search } = useSearch();
    search.value = 'todo';
    await vi.runAllTimersAsync();
    expect(searching.value).toBe(true);
  });

  it('search task', async () => {
    const { search } = useSearch();

    search.value = 'todo';

    await vi.runAllTimersAsync();

    expect(searchTasks).toBeCalledWith('todo');
  });

  it('search command', async () => {
    const { search } = useSearch();

    search.value = '>主页';

    await vi.runAllTimersAsync();

    expect(searchCommands).toBeCalledWith('主页');
  });

  it('should be reset when search is empty', async () => {
    const { search, loading, searching } = useSearch();

    search.value = 'todo';

    await vi.runAllTimersAsync();

    search.value = '';

    await vi.runAllTimersAsync();

    expect(loading.value).toBe(false);
    expect(searching.value).toBe(false);
    expect(resetSearchCommands).toBeCalled();
    expect(resetSearchTasks).toBeCalled();
  });
});
