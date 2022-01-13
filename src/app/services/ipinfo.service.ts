import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpinfoService {

  constructor(private http: HttpClient) { }

  getIpInfo() {
    return this.http.get<any>("https://www.ipinfo.io/?token=a4216feb6ae492");
    // return this.http.get<any>("https://mocki.io/v1/fd34240c-6f89-4193-ac7b-30eb3ce0f672");
  }
}
