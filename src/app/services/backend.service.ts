import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getResponse(value: string) {
    // return this.http.get<any>("/google/maps/api/place/autocomplete/json?input="+value+"&key=AIzaSyAG-bpTtCMJ6-9m-LSPIhEAzv4dd3fnAGw&types=(cities)");
    return this.http.get<any>("/api/tomorrow/"+value);
    // return this.http.get<any>("https://mocki.io/v1/e242d1f0-40ac-4172-8900-d143dec955eb");
  }
}
