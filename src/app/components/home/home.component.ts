import { Component, Input, OnInit} from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import axios from 'axios'; //tool for making HTTP requests in JavaScript or TypeScript.
import { BASE_URL } from 'src/app/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @Input() imageUrl: string | undefined;

  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>; // ViewChild decorator allows accessing a reference to an HTML canvas element
  private chartInstance: Chart | null = null;

  //Values for the chart
  private baseCurrency = ''; 
  private targetCurrency = '';

  ngOnInit() {
    const localStorageData = localStorage.getItem('transactionHistory');
      if (localStorageData) {
        const transactionHistory = JSON.parse(localStorageData);
        const latestTransaction = transactionHistory[transactionHistory.length - 1];
        this.baseCurrency = latestTransaction.from;
        this.targetCurrency = latestTransaction.to;
      }
    }




  ngAfterViewInit() {
    Chart.register(...registerables); //registers the provided Chart.js plugins or components for use
    this.updateChart(7); // Initial chart with 7 days
  }

  async updateChart(days: number) {
    const chartVar = this.lineChart?.nativeElement.getContext('2d'); //retrieves the 2D rendering context of the HTML canvas element\

    if (chartVar) {
      //Setting the Date
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days); //days depends on the radio button

      //Converts the date to a string representatino and extracts the Date part
      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = today.toISOString().split('T')[0];

      
      

      //API for the graph
      const graphRequestURL = `${BASE_URL}timeseries?start_date=${startDateString}&end_date=${endDateString}&symbols=${this.baseCurrency},${this.targetCurrency}`;
      try {
        const response = await axios.get(graphRequestURL);
        const rates = response.data.rates;

        //Itrates over the rate object keys and created a new input on the chart with the rate
        const currencyData = Object.keys(rates).map(date => ({
          date,
          rate: rates[date][this.targetCurrency] / rates[date][this.baseCurrency]
        }));

        //Mapped onto the graphs axis
        const dates = currencyData.map(data => this.formatDate(data.date));
        const data = currencyData.map(data => data.rate);

        //Destroys the existing chart to make a new chart
        if (this.chartInstance) {
          this.chartInstance.destroy(); // Destroy the previous chart
        }

        // Properties of the chart 
        this.chartInstance = new Chart(chartVar, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: `${this.baseCurrency}/${this.targetCurrency}`,
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          }
        });
      } catch (error) {
        console.error('Error retrieving conversion rates:', error);
      }
    }
  }

  //Date format shown on the x axis
  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}`;
  }

  // Change of radio buttons
  onRadioChange(event: any) {
    const days = parseInt(event.target.value, 10); //used to parse the event.target.value as a decimal number
    this.updateChart(days);
  }

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
    const requestURL = `${BASE_URL}convert?from=${this.fromCurrency}&to=${this.toCurrency}`;

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
}

