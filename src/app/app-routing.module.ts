import { NgModule } from '@angular/core';


import { HomeComponent } from './components/home/home.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { GraphComponent } from './components/graph/graph.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' }, // Default route redirects to 'Home'
    { path: 'Home', component: HomeComponent },
    { path: 'TransactionHistory', component: TransactionHistoryComponent},
    { path: 'Graph', component: GraphComponent},

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