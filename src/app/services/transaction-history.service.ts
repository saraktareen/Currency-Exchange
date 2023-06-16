import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  private TransactionHistory: any[] = [];

  constructor() {
    const existingHistoryJSON = localStorage.getItem('transactionHistory');
    this.TransactionHistory = existingHistoryJSON ? JSON.parse(existingHistoryJSON) : [];
  }

  getTransactionHistory(): any[] {
    return this.TransactionHistory;
  }

  addToHistory(transactionHistory: any) {
    this.TransactionHistory.push(transactionHistory);
    const updatedHistoryJSON = JSON.stringify(this.TransactionHistory);
    localStorage.setItem('transactionHistory', updatedHistoryJSON);
  }
}
