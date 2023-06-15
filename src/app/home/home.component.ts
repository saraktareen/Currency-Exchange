import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  activeTab: string = 'Convert';
  amountValue: number | undefined;
  fromCurrency: string = '';
  toCurrency: string = '';
  displayAmount: string = '';
  displayRate = '';


  onTabClick(tab: string) {
    this.activeTab = tab;
  }

  swapCurrencies() {
    const tempCurrency = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = tempCurrency;
  }

  // function is made asynchronous
  async makeApiRequest() {
    const requestURL = `https://api.exchangerate.host/convert?from=${this.fromCurrency}&to=${this.toCurrency}`;

      const response = await fetch(requestURL);
      const data = await response.json();

      const exchangeRate = (data.result).toFixed(2); // Assuming the API response has a 'result' field for the exchange rate
      const amount = this.amountValue || 0; // User-entered amount to be converted
      const convertedAmount = (amount * exchangeRate).toFixed(2); // Converted amount is displayed to the second decimal place

      this.displayAmount = `Converted Amount: ${convertedAmount}`;
      this.displayRate = `Exchange Rate: ${exchangeRate}`;
  }

  onCurrencyInputChange(event: any, field: string) {
    const inputValue = event.target.value.toUpperCase();
    if (inputValue.length <= 3) {
      if (field === 'from') {
        this.fromCurrency = inputValue;
      } else if (field === 'to') {
        this.toCurrency = inputValue;
      }
    } else {
      event.target.value = inputValue.substr(0, 3);
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


  
}
