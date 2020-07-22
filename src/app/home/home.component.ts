import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getfilteredTodosList, State} from '../app.reducer';
import {AppService} from '../app.service';
import {AuthService} from '../auth.service';
import {Todo} from '../todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private store: Store<State>, private appService: AppService, private authService: AuthService) {
  }

  allTodos: Todo[];

  onSearch(event): void {
    this.appService.filterTodos(event.target.value);
    this.allTodos = this.allTodos.filter((todo) => todo.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
  }

  onDelete(todoId): void {
    this.appService.deleteTodo(todoId);
  }

  ngOnInit(): void {
    this.store.select(getfilteredTodosList).subscribe((todos) => {
      this.allTodos = todos;
    });
  }
}
