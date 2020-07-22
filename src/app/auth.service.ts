import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthData} from './auth-data.model';
import * as Auth from './auth.actions';
import {State} from './app.reducer';
import {AppService} from './app.service';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private appService: AppService,
    private store: Store<State>
  ) {
  }

  initAuthListener(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/']);
        this.appService.fetchTodos();
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  login(authData: AuthData, errorCallback): void {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        errorCallback('success');
      })
      .catch(error => {
        errorCallback(error.message);
      });
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
