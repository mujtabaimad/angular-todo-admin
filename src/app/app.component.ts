import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './app.reducer';
import {AppService} from './app.service';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<State>, private appService: AppService, private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }
}
