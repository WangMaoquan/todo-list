export interface ListProject {
  id: string;
  name: string;
  type: TasksSelectorType.listProject;
}

export enum SmartProjectName {
  Complete = '已完成',
  Trash = '垃圾桶',
}
