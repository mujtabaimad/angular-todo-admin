import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './app.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MaterialModule} from './modules/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TodoCardComponent} from './todo-card/todo-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppService} from './app.service';
import {authReducer} from './auth.reducer';
import {AuthService} from './auth.service';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoCardComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({appTodos: appReducer, appAuth: authReducer}),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AppService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
