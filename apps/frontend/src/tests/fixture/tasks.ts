import { TaskStatus } from '@/types/task.d';

export const tasks = [
  {
    id: '0',
    content: 'coding',
    title: 'todo',
    status: TaskStatus.ACTIVE,
    projectId: '0',
    position: 1,
  },
  {
    id: '1',
    content: '写代码',
    title: '今天写代码了嘛',
    status: TaskStatus.COMPLETED,
    projectId: '0',
    position: 2,
  },
];
