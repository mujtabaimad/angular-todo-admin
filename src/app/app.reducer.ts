import {Actions, DELETE_TODO, FILTER_TODOS, SET_TODOS} from './app.actions';
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
      console.log(action);
      return {
        ...state,
        todos: action.payload,
        filteredTodos: action.payload.filter((todo) => {
          if (todo.title.toLocaleLowerCase().includes(state.filterQuery.toLocaleLowerCase())) {
            return true;
          } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < todo.tasks.length; i++) {
              if (todo.tasks[i]?.text?.toLocaleLowerCase()?.includes(state.filterQuery.toLocaleLowerCase())) {
                return true;
              }
            }
            console.log(todo.tasks, state.filterQuery.toLocaleLowerCase());
            return false;
          }
        })
      };
    case FILTER_TODOS:
      return {
        ...state,
        filterQuery: action.payload,
        filteredTodos: state.todos.filter((todo) => {
            if (todo.title.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())) {
              return true;
            } else {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < todo.tasks.length; i++) {
                if (todo.tasks[i]?.text?.toLocaleLowerCase()?.includes(action.payload.toLocaleLowerCase())) {
                  return true;
                }
              }
              return false;
            }
          }
        )
      };
    case DELETE_TODO:
      console.log(action.payload);
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        filteredTodos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default: {
      return state;
    }
  }
}

export const getTodosState = createFeatureSelector<State>('appTodos');
export const getTodosList = createSelector(getTodosState, (state: State) => state.todos);
export const getfilteredTodosList = createSelector(getTodosState, (state: State) => state.filteredTodos);
