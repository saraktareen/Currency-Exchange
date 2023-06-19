// import { Component} from '@angular/core';
// import { AfterViewInit } from '@angular/core';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
// import { registerables } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
//   // ...

//   @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;

//   ngAfterViewInit() {
//     Chart.register(...registerables); // Register necessary chart types, options, and plugins
  
//     const ctx = this.lineChart?.nativeElement.getContext('2d');
//     if (ctx) {
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//           datasets: [{
//             label: 'My Dataset',
//             data: [65, 59, 80, 81, 56, 55],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//           }]
//         },
//       options: {
//         // Add any additional options for customization
//       }
//     });
//     }
//   }

  // constructor(private transactionHistoryService: TransactionHistoryService) {}
  transactionHistory: any[] = [];

  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  activeTab: string = 'Convert';
  amountValue: number | undefined;
  fromCurrency: string = '';
  toCurrency: string = '';
  displayConvertedAmount: string = '';
  displayRate = '';
  result = '';
  id: number = 0;

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

    try{
      const response = await fetch(requestURL);
      const data = await response.json();

      const exchangeRate = (data.result).toFixed(2); // Assuming the API response has a 'result' field for the exchange rate
      const amount = this.amountValue || 0; // User-entered amount to be converted
      const convertedAmount = (amount * exchangeRate).toFixed(2); // Converted amount is displayed to the second decimal place


      this.result = `${amount} ${this.fromCurrency} =`
      this.displayConvertedAmount = `${convertedAmount} ${this.toCurrency}`;
      this.displayRate = `1 ${this.fromCurrency} = ${exchangeRate} ${this.toCurrency}`;
      
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
          currentDate: this.currentDate
        };
        transactionHistory.push(newTransaction); 
        // Convert the array back to a JSON string
        const updatedHistoryJSON = JSON.stringify(transactionHistory);

        // Store the updated transaction history in local storage
        localStorage.setItem('transactionHistory', updatedHistoryJSON);
      }catch (error) {
      this.result = 'Error: Conversion request failed';
      this.displayConvertedAmount = '';
      this.displayRate = '';
    } 
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
  
  // makeGraphApiRequest() {
  //   const requestURL = `https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2020-01-04`;
  // }

  
}
