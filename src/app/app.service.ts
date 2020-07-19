import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {State} from './app.reducer';
import {Store} from '@ngrx/store';
import {FilterTodos, SetTodos} from './app.actions';

@Injectable()
export class AppService {

  constructor(private db: AngularFirestore, private store: Store<State>) {
  }

  fetchTodos(): void {
    console.log('fired');
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
        this.store.dispatch(new SetTodos(todos));
      },
      error => {

      }
    );
  }

  filterTodos(query): void {
    this.store.dispatch(new FilterTodos(query));
  }
}
