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
import {FormsModule} from '@angular/forms';
import {AppService} from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({appTodos: appReducer}),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
