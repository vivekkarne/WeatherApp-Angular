import { DataService } from './../services/data.service';
import { routeTransitionAnimations } from './route-transitions-animations';
import { ActivatedRoute, ActivationStart, Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-results-parent',
  templateUrl: './results-parent.component.html',
  styleUrls: ['./results-parent.component.css'],
  animations: [routeTransitionAnimations]
})
export class ResultsParentComponent implements OnInit {
  // @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  isEmpty: boolean;
  constructor(private router: Router, private routeActive: ActivatedRoute, public ds: DataService) { 
  }

  prepareRoute(outlet: RouterOutlet) {
    // console.log('hello!!!!!!');
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }

  isConfig() {
    // active when not empty or when error
    console.log(!this.ds.isEmpty() || this.ds.isError());
    return (!this.ds.isEmpty() || this.ds.isError());
  }

  ngOnInit(): void {
  }

}
