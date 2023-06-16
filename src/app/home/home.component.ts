import { Component } from '@angular/core';
import { TransactionHistoryService } from '../services/transaction-history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private transactionHistoryService: TransactionHistoryService) {}

  transactionHistory: any[] = [];


  activeTab: string = 'Convert';
  amountValue: number | undefined;
  fromCurrency: string = '';
  toCurrency: string = '';
  displayConvertedAmount: string = '';
  displayRate = '';
  result = '';
  id: number = 0;
  // duplicateCurrencyMessage = '';

  startDate: string = '';
  endDate: string = '';



  onTabClick(tab: string) {
    this.activeTab = tab;
  }

  swapCurrencies() {
    const tempCurrency = this.fromCurrency.substring(0, 3);
    this.fromCurrency = this.toCurrency.substring(0, 3);
    this.toCurrency = tempCurrency;
  }

  // function is made asynchronous
  // Converts the currency
  async makeApiRequest() {
    const requestURL = `https://api.exchangerate.host/convert?from=${this.fromCurrency}&to=${this.toCurrency}`;

      const response = await fetch(requestURL);
      const data = await response.json();

      const exchangeRate = (data.result).toFixed(2); // Assuming the API response has a 'result' field for the exchange rate
      const amount = this.amountValue || 0; // User-entered amount to be converted
      const convertedAmount = (amount * exchangeRate).toFixed(2); // Converted amount is displayed to the second decimal place


      this.result = `${amount} ${this.fromCurrency} =`
      this.displayConvertedAmount = `${convertedAmount} ${this.toCurrency}`;
      this.displayRate = `1 ${this.fromCurrency} = ${exchangeRate} ${this.toCurrency}`;

      // if (this.fromCurrency === this.toCurrency) {
      //   this.duplicateCurrencyMessage = 'Cannot convert between same currencies';
      //   return;
      // }

      
        // Retrieve existing transaction history from local storage if not a new array called transactionHistory is created
        const existingHistoryJSON = localStorage.getItem('transactionHistory');
        let transactionHistory: any[] = [];

        //JSON.parse converts the string from JSON to JS
        if (existingHistoryJSON) {
          transactionHistory = JSON.parse(existingHistoryJSON);
        }

        // Append the new conversion details to the transaction history
        const newTransaction = {
          id: this.id,
          amount: this.amountValue,
          from: this.fromCurrency,
          to: this.toCurrency,
          rate: exchangeRate,
          convertedAmount: convertedAmount,
        };
        transactionHistory.push(newTransaction); 
        this.id++;
        // Convert the array back to a JSON string
        const updatedHistoryJSON = JSON.stringify(transactionHistory);

        // Store the updated transaction history in local storage
        localStorage.setItem('transactionHistory', updatedHistoryJSON);
      } 

  //For the From and To input fields to not allow any numberic value to be added and to allow only 3 uppercase characters
  onCurrencyInputChange(event: any, field: string) 
  {
    const inputValue = event.target.value.toUpperCase();
    const filteredValue = inputValue.replace(/[^A-Z]/g, ''); // For non-alphabetic characters

    if (filteredValue.length <= 3) {
      if (field === 'from') {
        this.fromCurrency = filteredValue;
      } else if (field === 'to') {
        this.toCurrency = filteredValue;
      }
     
      event.target.value = filteredValue; // Update the input field value
    } else {
      event.target.value = filteredValue.substr(0, 3);
    }
  }

  onAmountInputChange(event: any) {
    const input = event.target;
    const inputValue = input.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/\D/g, ''); // /\D/g divides the number into single digits

    // Update the input value with the filtered numeric value
    input.value = numericValue;

    // Update the amountValue property in your component
    this.amountValue = numericValue === '' ? undefined : parseInt(numericValue); // Prevents the NaN from being displayed when the user types in a number
  }

  makeGraphApiRequest() {
    const existingHistoryJSON = localStorage.getItem('transactionHistory');
    this.transactionHistory = existingHistoryJSON ? JSON.parse(existingHistoryJSON) : [];
  }
}
