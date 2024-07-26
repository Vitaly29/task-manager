import { makeAutoObservable } from "mobx";

export class Task {
  id: number;
  text: string;
  isCompleted: boolean = false;
  subTasks: Task[] = [];

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
    makeAutoObservable(this);
  }

  addSubTask(task: Task) {
    this.subTasks.push(task);
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}

export class TaskStore {
  tasks: Task[] = [];
  selectedTasks: Set<number> = new Set();

  constructor() {
    makeAutoObservable(this);
  }

  addTask(text: string) {
    const id = Date.now();
    this.tasks.push(new Task(id, text));
  }

  addSubTask(parentId: number, text: string) {
    const parentTask = this.getTaskById(parentId);
    if (parentTask) {
      const subTask = new Task(Date.now(), text);
      parentTask.addSubTask(subTask);
    }
  }

  removeSelectedTasks() {
    this.tasks = this.tasks.filter(task => !this.selectedTasks.has(task.id));
    this.selectedTasks.clear();
  }

  toggleTaskSelection(taskId: number) {
    if (this.selectedTasks.has(taskId)) {
      this.selectedTasks.delete(taskId);
    } else {
      this.selectedTasks.add(taskId);
    }
  }

  getTaskById(id: number) {
    const findTask = (tasks: Task[]): Task | undefined => {
      for (const task of tasks) {
        if (task.id === id) return task;
        const subTask = findTask(task.subTasks);
        if (subTask) return subTask;
      }
      return undefined;
    };

    return findTask(this.tasks);
  }
}

export const taskStore = new TaskStore();
