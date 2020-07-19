export interface Todo {
  id: number;
  title: string;
  userId: string;
  tasks: Task[];
}

export interface Task {
  text: string;
  finished: boolean;
}
