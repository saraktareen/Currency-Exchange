import { NgModule } from '@angular/core';


import { HomeComponent } from './home/home.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' }, // Default route redirects to 'Home'
    { path: 'Home', component: HomeComponent },
    { path: 'TransactionHistory', component: TransactionHistoryComponent}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}