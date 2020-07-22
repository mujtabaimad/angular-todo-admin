import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../todo.model';
import {AppService} from '../app.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo = new EventEmitter<string>();

  completed: number;
  editable = false;

  onTodoDelete(): void {
    this.deleteTodo.emit(this.todo.id);
  }

  onTaskChange(changedTask): void {

    const tasks = this.todo.tasks.map((task) => {
      if (task === changedTask) {
        return {text: task.text, finished: !task.finished};
      }
      return task;
    });
    this.appService.updateTask(this.todo, tasks);
    this.calculateCompilation();
  }

  calculateCompilation(): void {
    const tasksCount = this.todo.tasks.length;
    const completedTasksCount = this.todo.tasks.filter((task) => task.finished).length;
    this.completed = completedTasksCount / tasksCount * 100;
  }

  deleteTask(selectedTask): void {
    const tasks = this.todo.tasks.filter((task) => task !== selectedTask);
    this.appService.updateTask(this.todo, tasks);
    this.calculateCompilation();
  }

  constructor(private appService: AppService) {
  }

  toggleEdit(): void {
    this.editable = !this.editable;
    this.appService.updateTodo(this.todo);
  }

  ngOnInit(): void {
    this.calculateCompilation();
  }

}
