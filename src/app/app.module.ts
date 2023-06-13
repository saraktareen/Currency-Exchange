import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { RouterModule, Routes } from '@angular/router';

const appRoute: Routes = [
  {path: 'Home', component: NavbarComponent},
  {path: 'History', component: TransactionHistoryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransactionHistoryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
