import { DataService } from './../services/data.service';
import { BackendService } from './../services/backend.service';
import { LocalStorageService } from './../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favData: any = {}

  constructor(private r: Router, public localStorageService: LocalStorageService, private b: BackendService, private d: DataService) { }

  ngOnInit(): void {
    this.favData = this.localStorageService.getItems();
  }


  func(lat: string, lng: string, city: string, state: string, street: string) {
    console.log(lat, lng, city, state, street);
    this.r.navigateByUrl('/results/loading');
    this.d.responseJson["latLong"] = lat + ',' +lng;
    this.d.responseJson["city"] = city;
    this.d.responseJson["state"] = state;
    this.d.responseJson["street"] = street;
    this.b.getResponse(this.d.responseJson["latLong"]).subscribe(data => {
      if(data.hasOwnProperty('name') && data.name === 'Error') {
        console.log("No data from tomorrow api");
        this.d.setError(true);
        this.d.responseJson = {};
        this.r.navigateByUrl('/results/error');
        return;
      }
      this.d.setError(false);
      this.d.responseJson["response"] = data;
      this.r.navigateByUrl('/results/day');
    })
  }

  delete(str) {
    this.localStorageService.removeItem(str);
    this.favData = this.localStorageService.getItems();
  }

}
