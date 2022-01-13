import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) { }

  getGeocoding(value: string) {
    // console.log(value);
    return this.http.get<any>("https://maps.googleapis.com/maps/api/geocode/json?address="+value+"&key=AIzaSyAG-bpTtCMJ6-9m-LSPIhEAzv4dd3fnAGw");
    // return this.http.get<any>("https://mocksi.io/v1/6f420e88-a17a-4a9b-8ecd-565266ea1fe8");
  }
}
