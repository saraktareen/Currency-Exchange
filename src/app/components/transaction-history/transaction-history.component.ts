import { Component, Input } from '@angular/core';
import { TransactionHistoryService } from '../../services/transaction-history.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent {
  @Input() imageUrl: string | undefined;

  TransactionHistory: any[] = [];

  constructor(private transactionHistoryService: TransactionHistoryService) {}

  ngOnInit() {
    this.TransactionHistory = this.transactionHistoryService.getTransactionHistory();
  }

  addToHistory(transaction: any) {
    this.transactionHistoryService.addToHistory(transaction);
  }
}
