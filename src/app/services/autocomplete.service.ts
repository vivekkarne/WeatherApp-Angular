import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) { }

  getOptions(value: string) {
    // return this.http.get<any>("/google/maps/api/place/autocomplete/json?input="+value+"&key=AIzaSyAG-bpTtCMJ6-9m-LSPIhEAzv4dd3fnAGw&types=(cities)");
    return this.http.get<any>("/api/autocomplete/"+value);
    // return this.http.get<any>("https://mocki.io/v1/3bcdbff6-50f1-42d9-963b-1d96dd71349e");
  }
}
