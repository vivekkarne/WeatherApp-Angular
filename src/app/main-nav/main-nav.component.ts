import { DataService } from './../services/data.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  @Input() loading:boolean = false;
  @Input() fetched:boolean = false;
  @Input() clear:boolean = false;
  @Input() responseJson:any = {};
  active: any = 'results';
  city: any = '';
  state: any = '';

  constructor() { }

  ngOnInit(): void {

  }
}
