import type { FuseResult } from 'fuse.js';
import Fuse from 'fuse.js';
import { ref } from 'vue';
import { useTasksStore } from '@/store/useTasksStore';
import { completeSmartProject } from '@/store/useSmartProjects';
import { useListProjectsStore } from '@/store/useListProjectsStore';
import { TaskStatus, type TasksSelector } from '@/types/task.d';

interface SearchTaskItem {
  id: string;
  title: string;
  desc: string;
  done: boolean;
  from: TasksSelector | undefined;
}

const filteredTasks = ref<FuseResult<SearchTaskItem>[]>([]);
const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ['title', 'desc'],
});

export function useSearchTasks() {
  async function searchTasks(input: string) {
    const tasksStore = useTasksStore();
    const projectsStore = useListProjectsStore();

    const tasks = await tasksStore.findAllTasksNotRemoved();
    const fuseTasks = tasks.map((task) => {
      const done = task.status === TaskStatus.COMPLETED;
      const from = done
        ? completeSmartProject
        : projectsStore.findProject(task.projectId);
      return {
        id: task.id!,
        title: task.title,
        desc: task.content,
        done,
        from,
      };
    });
    fuse.setCollection(fuseTasks);

    filteredTasks.value = fuse.search(input);
  }

  function resetSearchTasks() {
    filteredTasks.value = [];
  }

  return {
    filteredTasks,
    searchTasks,
    resetSearchTasks,
  };
}
