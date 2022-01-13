import { Component, OnInit } from '@angular/core';
import { Meteogram } from './meteogram';
import { Chart } from 'angular-highcharts';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-meteogram',
  templateUrl: './meteogram.component.html',
  styleUrls: ['./meteogram.component.css']
})
export class MeteogramComponent implements OnInit {
  meteogram: Meteogram;
  meteoData: any = [];
  chartOptions = {};
  chart = {};


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.meteoData = this.dataService.getMeteoData();
    this.meteogram = new Meteogram(this.meteoData);
    this.meteogram.parseData();
    this.chartOptions = this.meteogram.getMeteoOptions();
    this.chart = new Chart(this.chartOptions);
  }

}
