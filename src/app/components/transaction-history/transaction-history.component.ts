import { Component } from '@angular/core';
import { TransactionHistoryService } from '../../services/transaction-history.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent {

  TransactionHistory: any[] = [];

  constructor(private transactionHistoryService: TransactionHistoryService) {}

  ngOnInit() {
    this.TransactionHistory = this.transactionHistoryService.getTransactionHistory();
  }

  addToHistory(transaction: any) {
    this.transactionHistoryService.addToHistory(transaction);
  }
}
