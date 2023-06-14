import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoute: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'History', component: TransactionHistoryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransactionHistoryComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
