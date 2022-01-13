import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFormComponent } from './search-form/search-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoadingComponent } from './loading/loading.component';
import { ResultsComponent } from './results/results.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResnavComponent } from './resnav/resnav.component';
import { DayTableComponent } from './day-table/day-table.component';
import { DailyChartComponent } from './daily-chart/daily-chart.component';
import { MeteogramComponent } from './meteogram/meteogram.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DayDetailComponent } from './day-detail/day-detail.component';
import { ResultsParentComponent } from './results-parent/results-parent.component';
import { DetailedTableComponent } from './detailed-table/detailed-table.component';
import { CustomGoogleMapComponent } from './custom-google-map/custom-google-map.component';
import { DatePipe } from '@angular/common';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as windbarb from 'highcharts/modules/windbarb.src';
import * as more from 'highcharts/highcharts-more.src';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    MainNavComponent,
    LoadingComponent,
    ResultsComponent,
    FavoritesComponent,
    ResnavComponent,
    DayTableComponent,
    DailyChartComponent,
    MeteogramComponent,
    DayDetailComponent,
    ResultsParentComponent,
    DetailedTableComponent,
    CustomGoogleMapComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    HighchartsChartModule,
    ChartModule
  ],
  providers: [DatePipe, { provide: HIGHCHARTS_MODULES, useFactory: () => [ windbarb ,more ] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
