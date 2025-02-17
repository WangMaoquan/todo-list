import { useSearchTasks } from '@/composables/command';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useTasksStore } from '@/store/useTasksStore';
import { useListProjectsStore } from '@/store/useListProjectsStore';
import { completeSmartProject } from '@/store/useSmartProjects';
import { project, tasks } from '@/tests/fixture';

describe('useSearchTasks', () => {
  beforeEach(() => {
    createTestingPinia({
      createSpy: vi.fn,
    });

    const taskStore = useTasksStore();

    vi.mocked(taskStore.findAllTasksNotRemoved).mockImplementation(async () => {
      return tasks;
    });

    const listProjectStore = useListProjectsStore();

    vi.mocked(listProjectStore.findProject).mockImplementation(() => {
      return project;
    });

    // 全局状态重置
    const { resetSearchTasks } = useSearchTasks();

    resetSearchTasks();
  });
  it('should be search a value by title', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();

    await searchTasks('todo');

    expect(filteredTasks.value.length).toBe(1);
  });
  it('should be search a value by desc', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();

    await searchTasks('coding');

    expect(filteredTasks.value.length).toBe(1);
    const { item } = filteredTasks.value[0];
    // 只校验我们关心的值
    expect(item.desc).toBe('coding');
    // 另外的我们保证有对应的 key 就好
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('done');
    expect(item).toHaveProperty('from');
  });

  it('should not be found when the task dose not exist', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();

    await searchTasks('1');

    expect(filteredTasks.value.length).toBe(0);
  });

  it("should be task's project is listProject when status is active", async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();

    await searchTasks('todo');

    expect(filteredTasks.value[0].item.done).toBe(false);
    expect(filteredTasks.value[0].item.from?.name).toBe('学习');
  });

  it("should be task's project is listProject when status is complete", async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();

    await searchTasks('写代码');

    expect(filteredTasks.value[0].item.done).toBe(true);
    expect(filteredTasks.value[0].item.from?.name).toBe(
      completeSmartProject.name,
    );
  });

  it('should be reset tasks', async () => {
    const { searchTasks, resetSearchTasks, filteredTasks } = useSearchTasks();

    await searchTasks('coding');

    resetSearchTasks();

    expect(filteredTasks.value.length).toBe(0);
  });
});
