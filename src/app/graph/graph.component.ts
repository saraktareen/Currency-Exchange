import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  private chartInstance: Chart | null = null;

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.updateChart(7); // Initial chart with 7 days
  }

  updateChart(days: number) {
    const ctx = this.lineChart?.nativeElement.getContext('2d');

    if (ctx) {
      const today = new Date();
      const data = [65, 59, 80, 81, 56, 55, 40]; // Sample data for the past 7 days
      const dates = this.getDays(today, days);

      if (this.chartInstance) {
        this.chartInstance.destroy(); // Destroy the previous chart
      }

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'My Dataset',
              data: data.slice(0, days + 1),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        }
      });
    }
  }

  getDays(today: Date, days: number): string[] {
    const dates: string[] = [];

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = this.formatDate(date); // Format the date as needed
      dates.push(formattedDate);
    }

    return dates;
  }

  formatDate(date: Date): string {
    // const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}`;
  }

  onRadioChange(event: any) {
    const days = parseInt(event.target.value, 10);
    this.updateChart(days);
  }
}
