export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  content: string;
  projectId: string;
  position: number;
}

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  REMOVED = 'removed',
}

export enum TasksSelectorType {
  listProject = 'listProject',
  smartProject = 'smartProject',
}

export type TasksSelector = ListProject | SmartProject;
