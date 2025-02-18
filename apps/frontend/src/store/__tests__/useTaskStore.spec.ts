import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTasksStore } from '../useTasksStore';
import { fetchCreateTask } from '@/api';
import { project } from '@/tests/fixture';
import { createPinia, setActivePinia } from 'pinia';
import { useTasksSelectorStore } from '../useTasksSelectorStore';
import { TaskStatus } from '@/types/task.d';
import { smartProjects } from '../useSmartProjects';

vi.mock('@/api');

vi.mocked(fetchCreateTask).mockImplementation(async (title: string) => {
  return {
    title,
    content: '这是一个内容',
    status: TaskStatus.ACTIVE,
    projectId: '1',
    updatedAt: new Date().toString(),
    createdAt: new Date().toString(),
    _id: '0',
    position: 1,
  };
});

describe('useTaskStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.clearAllMocks();
  });

  describe('add task', () => {
    /**
     * addTask
     * 验证行为:
     * 1. 不存在 tasksSelectorStore.currentSelector
     * 2. asksSelectorStore.currentSelector.type 是 smartProject
     * 3. fetchCreateTask 是否被调用
     * 验证状态
     * 添加进taskStore.tasks 的第一个位置
     */
    it('should add task to the first position', async () => {
      const tasksSelectorStore = useTasksSelectorStore();

      tasksSelectorStore.currentSelector = project;

      const taskStore = useTasksStore();

      await taskStore.addTask('吃饭');
      const task = await taskStore.addTask('做作业');
      expect(task?.title).toBe('做作业');
      expect(taskStore.tasks[0]).toEqual(task);
      expect(taskStore.currentActiveTask).toEqual(task);
      expect(fetchCreateTask).toBeCalledWith(task?.title, project.id);
    });

    it('should not add task when currentSelector is undefined', async () => {
      const tasksSelectorStore = useTasksSelectorStore();

      tasksSelectorStore.currentSelector = undefined;

      const taskStore = useTasksStore();

      const task = await taskStore.addTask('做作业');
      expect(task).toBeUndefined();
      expect(taskStore.tasks.length).toEqual(0);
      expect(taskStore.currentActiveTask).toBeUndefined();
      // 这里记得清楚 mock 缓存
      expect(fetchCreateTask).not.toBeCalled();
    });

    it('should not add task when currentSelector is smartProject', async () => {
      const tasksSelectorStore = useTasksSelectorStore();

      tasksSelectorStore.currentSelector = smartProjects[0];

      const taskStore = useTasksStore();

      const task = await taskStore.addTask('做作业');
      expect(task).toBeUndefined();
      expect(taskStore.tasks.length).toEqual(0);
      expect(taskStore.currentActiveTask).toBeUndefined();
      // 这里记得清楚 mock 缓存
      expect(fetchCreateTask).not.toBeCalled();
    });
  });
});
