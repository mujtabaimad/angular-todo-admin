export interface Todo {
  id: string;
  title: string;
  user: User;
  tasks: Task[];
}

export interface User {
  id: string;
  email: string;
}

export interface Task {
  text: string;
  finished: boolean;
}
