import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements AfterViewInit {
  // ...

  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    Chart.register(...registerables); // Register necessary chart types, options, and plugins
  
    const ctx = this.lineChart?.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'My Dataset',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
    }
  }
}

