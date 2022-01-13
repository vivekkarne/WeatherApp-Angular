import { DataService } from './services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService: DataService) {

  }

  title = 'weather-app';
  isLoading: boolean = false;
  isClear: boolean = false;
  isResponse: boolean = false;
  responseJson: any = {};

  parseData(event: any) {
    this.responseJson = event.response;
    this.isLoading = false;
    this.isResponse = true;
  }

  clear(event: any) {
    this.isClear = !event;
    this.isResponse = false;
    this.dataService.setError(false);
  }
}
