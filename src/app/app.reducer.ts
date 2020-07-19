import {Actions, FILTER_TODOS, SET_TODOS} from './app.actions';
import {Todo} from './todo.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  todos: Todo[];
  filteredTodos: Todo[];
  filterQuery: string;
}

const initialState: State = {
  todos: [],
  filteredTodos: [],
  filterQuery: ''
};

export function appReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case SET_TODOS:
      console.log('right action type');
      return {
        ...state,
        todos: action.payload,
        filteredTodos: action.payload.filter((todo) => todo.title.toLocaleLowerCase().includes(state.filterQuery.toLocaleLowerCase()))
      };
    case FILTER_TODOS:
      return {
        ...state,
        filterQuery: action.payload,
        filteredTodos: state.todos.filter((todo) => todo.title.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()))
      };
    default: {
      return state;
    }
  }
}

export const getTodosState = createFeatureSelector<State>('appTodos');
export const getTodosList = createSelector(getTodosState, (state: State) => state.todos);
export const getfilteredTodosList = createSelector(getTodosState, (state: State) => state.filteredTodos);
