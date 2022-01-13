import { LocalStorageService } from './../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  city: string = '';
  state: string = '';
  curr: any;
  disable: boolean = false;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state)).subscribe((data) => {
        this.curr = data;
        if (this.curr.hasOwnProperty('returnUrl')) {
          this.disable = false;
        }
        else {
          this.disable = true;
        }
      })
    this.state = this.dataService.getState();
    this.city = this.dataService.getCity();
    if(this.dataService.isError()) {
      this.router.navigateByUrl("/results/error");
    }
  }

  toggleFavs(): void {
    if(this.localStorageService.isLatLong(this.dataService.getLatLong())) {
      this.localStorageService.removeItem(this.dataService.getLatLong());
      return;
    }
    this.localStorageService.setItem(this.dataService.getLatLong(),this.dataService.getCity() +','+ this.dataService.getState()+','+this.dataService.getStreet());
  }

  rIsLatLong(): boolean {
    return this.localStorageService.isLatLong(this.dataService.getLatLong());
  }


}
