import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';

import { TransactionHistoryService } from './services/transaction-history.service';
import { AppRoutingModule } from './app-routing.module';
import { GraphComponent } from './components/graph/graph.component';
import { HttpClientModule } from '@angular/common/http';
import { ConvertComponent } from './components/convert/convert.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TransactionHistoryComponent,
    GraphComponent,
    ConvertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TransactionHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
