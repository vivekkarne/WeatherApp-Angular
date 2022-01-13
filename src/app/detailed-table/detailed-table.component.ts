import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-table',
  templateUrl: './detailed-table.component.html',
  styleUrls: ['./detailed-table.component.css']
})
export class DetailedTableComponent implements OnInit {

  @Input() details: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
