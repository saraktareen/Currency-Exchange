import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeTab: string = 'Convert';
  amountValue: number = 0;
  fromCurrency: string = '';
  toCurrency: string = '';

  onTabClick(tab: string) {
    this.activeTab = tab;
  }

  swapCurrencies() {
    const tempCurrency = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = tempCurrency;
  }

  async makeApiRequest() {
    const requestURL = `https://api.exchangerate.host/convert?from=${this.fromCurrency}&to=${this.toCurrency}`;

    try {
      const response = await fetch(requestURL);
      const data = await response.json();

      const exchangeRate = data.result; // Assuming the API response has a 'result' field for the exchange rate
      const amount = this.amountValue || 0; // User-entered amount to be converted
      const convertedAmount = (amount * exchangeRate).toFixed(2);

      console.log(`Converted Amount: ${convertedAmount}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
