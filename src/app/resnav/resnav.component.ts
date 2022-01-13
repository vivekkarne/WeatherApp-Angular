import { Router, RouterOutlet, ActivationStart } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resnav',
  templateUrl: './resnav.component.html',
  styleUrls: ['./resnav.component.css']
})
export class ResnavComponent implements OnInit {
  active: any = 'dayview';
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "primary") {
        this.outlet.deactivate();
      }
    });
  }

}
