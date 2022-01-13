import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  emptyKeys() {
    let count = 0;
    Object.keys(localStorage).forEach(function (key) {
      if (key.startsWith('xLatxLong')) {
        count++;
      }
    });
    return (count === 0);
  }

  setItem(coord: string, place: string) {
    localStorage.setItem('xLatxLong' + coord, place);
  }

  getItem(coord: string) {
    return localStorage.getItem('xLatxLong' + coord);
  }

  removeItem(coord: string) {
    return localStorage.removeItem('xLatxLong' + coord);
  }

  isLatLong(latLong: string) {
    return !(localStorage.getItem('xLatxLong' + latLong) === null);
  }

  getItems() {
    let obj = [];
    Object.keys(localStorage).forEach(function (key) {
      if (key.startsWith('xLatxLong')) {
        let val = localStorage.getItem(key).split(',');
        let coords = key.replace('xLatxLong', '').split(',');
        obj.push({
          lat: coords[0], lng: coords[1], city: val[0], state: val[1], street: val[2]
        });
      }
    });
    return obj;
  }
}
