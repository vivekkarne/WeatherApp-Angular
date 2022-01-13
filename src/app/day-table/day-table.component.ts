import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-day-table',
  templateUrl: './day-table.component.html',
  styleUrls: ['./day-table.component.css']
})
export class DayTableComponent implements OnInit {
  data: any = []
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    if(!this.dataService.isError()){
      this.data = this.dataService.getDayData();
    }
  }

}
