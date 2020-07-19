import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getfilteredTodosList, getTodosList, State} from './app.reducer';
import {AppService} from './app.service';
import {Todo} from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<State>, private appService: AppService) {
  }

  allTodos: Todo[];

  onSearch(event): void {
    this.appService.filterTodos(event.target.value);
    this.allTodos = this.allTodos.filter((todo) => todo.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
  }

  onDelete(todoId): void {
    this.allTodos = this.allTodos.filter((todo) => todo.id !== todoId);
  }

  ngOnInit(): void {
    this.appService.fetchTodos();
    this.store.select(getfilteredTodosList).subscribe((todos) => {
      this.allTodos = todos;
    });
  }
}
