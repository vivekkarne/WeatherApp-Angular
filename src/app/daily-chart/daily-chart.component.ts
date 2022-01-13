import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.css'],
  providers: [DatePipe]
})
export class DailyChartComponent implements OnInit {
  data: any = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private dataService: DataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.data = this.dataService.getDailyChartData();
    let date = Date.parse(this.datepipe.transform(this.data.time, 'EEEE, dd MMM YYYY') + ' GMT');
    this.chartOptions = {
      chart: {
        type: 'arearange',
        zoomType: 'x',
        height: 400,
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1
        }
      },
      title: {
        text: 'Temperature Ranges (Min, Max)',
        style: {
          color: '#716f6f',
          fontWeight: 'bold'
        }
      },

      xAxis: {
        type: 'datetime',
        accessibility: {
          rangeDescription: 'Range: Today to 15 days from now'
        },
        tickInterval: 24 * 3600 * 1000
      },

      yAxis: {
        title: {
          text: null
        }
      },

      tooltip: {
        shared: true,
        valueSuffix: '°F',
        xDateFormat: '%A, %b %e'
      },

      legend: {
        enabled: false
      },

      series: [{
        name: 'Temperatures',
        type: undefined,
        data: this.data.intervals,
        color: {
          linearGradient : {x1:0, x2:0, y1:0, y2:1},
          stops: [
            [0, Highcharts.getOptions().colors[3]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get('rgba') as string]
          ]
        },
        marker: {
          enabled: true,
          fillColor: Highcharts.getOptions().colors[0],
          lineColor: Highcharts.getOptions().colors[0]
        },
        pointStart: date,
        pointInterval: 24 * 3600 * 1000 // one day
      }]

    }
  }

}
