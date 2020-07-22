import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {State} from './app.reducer';
import {Store} from '@ngrx/store';
import {DeleteTodo, FilterTodos, SetTodos} from './app.actions';
import {Task, Todo} from './todo.model';

@Injectable()
export class AppService {

  constructor(private db: AngularFirestore, private store: Store<State>) {
  }

  fetchTodos(): void {
    console.log('fetchTodos');
    this.db
      .collection('todos')
      .snapshotChanges()
      .pipe(
        map((todos: any[]) => {
            return todos.map((todo) => {
              return {
                id: todo.payload.doc.id,
                ...todo.payload.doc.data()
              };
            });
          }
        )
      ).subscribe(
      (todos: []) => {
        console.log(todos);
        this.store.dispatch(new SetTodos(todos));
      },
      error => {

      }
    );
  }

  filterTodos(query): void {
    this.store.dispatch(new FilterTodos(query));
  }

  deleteTodo(todoId): void {

    this.db.collection('todos').doc(todoId).delete().then(() => {
      this.store.dispatch(new DeleteTodo(todoId));
    });
  }

  updateTask(todo, tasks: Task[]): void {
    console.log('deleteTask');
    console.log(todo);
    console.log(tasks);
    this.db.collection('todos').doc(todo.id).set({
      title: todo.title,
      tasks,
      user: todo.user
    });
  }

  updateTodo(todo: Todo): void {
    console.log('set');
    console.log(todo);
    this.db.collection('todos').doc(todo.id).set({
      title: todo.title,
      tasks: todo.tasks,
      user: todo.user
    });
  }


}
