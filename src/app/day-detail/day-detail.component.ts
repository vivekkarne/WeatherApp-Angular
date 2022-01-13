import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {
  public time: string = '';
  public details: any;
  public text: string;

  constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.time = params?.startTime;
      this.dataService.getDetailedData(this.time).subscribe(d => {
        this.details = d;
        if(this.details.street === '') {
          this.text = `The temperature in ${this.details.city}, ${this.details.state} on ${this.datePipe.transform(this.details.startTime,'EEEE, dd MMM YYYY')} is ${this.details.apparentTemp} \xB0F. The weather conditions are ${this.details.weatherStatus}.`;
        }
        else {
          this.text = `The temperature in ${this.details.street}, ${this.details.city}, ${this.details.state} on ${this.datePipe.transform(this.details.startTime,'EEEE, dd MMM YYYY')} is ${this.details.apparentTemp} \xB0F. The weather conditions are ${this.details.weatherStatus}.`;
        }
      })
    });
  }

  back(): void {
    this.router.navigateByUrl('/results/day', { state: { returnUrl: this.router.url } });
  }


}
