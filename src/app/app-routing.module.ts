import { LoadingComponent } from './loading/loading.component';
import { MeteogramComponent } from './meteogram/meteogram.component';
import { DayTableComponent } from './day-table/day-table.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResultsComponent } from './results/results.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyChartComponent } from './daily-chart/daily-chart.component';
import { DayDetailComponent } from './day-detail/day-detail.component';
import { ResultsParentComponent } from './results-parent/results-parent.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'results', component: ResultsParentComponent,
    children: [
      {
        path: '', component: ResultsComponent, data: { animationState : 'results' },
        children: [
          {
            path: '', component: DayTableComponent
          },
          {
            path: 'day', component: DayTableComponent
          },
          {
            path: 'daily', component: DailyChartComponent
          },
          {
            path: 'meteo', component: MeteogramComponent
          }
        ]
      },
      { path: 'details/:startTime', component: DayDetailComponent,  data: { animationState : 'details' } },
      { path: 'loading', component: LoadingComponent },
      { path: 'error', component: ErrorComponent }


    ]
  },
  { path: 'favorites', component: FavoritesComponent }

  // { path: 'results/details/:startTime', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
