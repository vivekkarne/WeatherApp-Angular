import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"

@Component({
  selector: 'app-custom-google-map',
  templateUrl: './custom-google-map.component.html',
  styleUrls: ['./custom-google-map.component.css']
})
export class CustomGoogleMapComponent implements OnInit {
  @Input() coord: any;
  @ViewChild('map') mapElement: any;
  _lat: number;
  _lng: number;

  loader = new Loader({
    apiKey: "AIzaSyAG-bpTtCMJ6-9m-LSPIhEAzv4dd3fnAGw",
    version: "weekly",
  });


  constructor() { }


  ngOnInit(): void {
    this.loader.load().then(() => {
      this._lat = parseFloat(this.coord.split(',')[0]);
      this._lng = parseFloat(this.coord.split(',')[1]);
      const loc = { lat: this._lat, lng: this._lng };
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: loc,
        zoom: 16,
      });
      const marker = new google.maps.Marker({
        position: loc,
        map: map,
      });
    
    });
  }

}
