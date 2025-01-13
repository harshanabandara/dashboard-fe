import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
import { SummaryState } from '../../core/store/summary/summary.state';
import { CommonModule } from '@angular/common';
import { GetSummary } from '../../core/store/summary/summary.actions';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users-graph',
  imports: [CommonModule],
  templateUrl: './users-graph.component.html',
  styleUrl: './users-graph.component.css'
})
export class UsersGraphComponent implements AfterViewInit {

  store = inject(Store)
  chartDataSignal = this.store.selectSignal(SummaryState.getState)
  chart: any;

  createChart(labels: string[], data: number[]) {

    // const keys: string[] = Object.keys(this.chartDataSignal().userActivity)
    // console.log("keys", keys)
    this.chart = new Chart("ActivityChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "New users",
            data: data,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    })
  }
  ngAfterViewInit(): void {
    this.store.dispatch(new GetSummary).subscribe(() => {
      const chartData = this.chartDataSignal();

      // Extract labels and data dynamically from the fetched data
      const labels = Object.keys(chartData.userActivity || {});
      const data = Object.values(chartData.userActivity || {}).map(Number);

      if (labels.length && data.length) {
        this.createChart(labels, data)
      }

    })
  }

}
