import {Action} from '@ngrx/store';
import {Todo} from './todo.model';

export const SET_TODOS = 'SET_TODOS';
export const FILTER_TODOS = 'FILTER_TODOS';
export const DELETE_TODO = 'DELETE_TODO';

export class SetTodos implements Action {
  readonly type = SET_TODOS;

  constructor(public payload: Todo[]) {
  }
}

export class FilterTodos implements Action {
  readonly type = FILTER_TODOS;

  constructor(public payload: string) {
  }
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public payload: string) {
  }
}

export type Actions = SetTodos | FilterTodos | DeleteTodo;
