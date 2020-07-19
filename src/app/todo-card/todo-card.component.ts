import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo = new EventEmitter<number>();

  completed: number;
  editable = false;

  onTodoDelete(): void {
    this.deleteTodo.emit(this.todo.id);
  }

  onTaskChange(): void {
    this.calculateCompilation();
  }

  calculateCompilation(): void {
    const tasksCount = this.todo.tasks.length;
    const completedTasksCount = this.todo.tasks.filter((task) => task.finished).length;
    this.completed = completedTasksCount / tasksCount * 100;
  }

  deleteTask(selectedTask): void {
    this.todo.tasks = this.todo.tasks.filter((task) => task !== selectedTask);
    this.calculateCompilation();
  }

  constructor() {
  }

  toggleEdit(): void {
    this.editable = !this.editable;
  }

  ngOnInit(): void {
    this.calculateCompilation();
  }

}
