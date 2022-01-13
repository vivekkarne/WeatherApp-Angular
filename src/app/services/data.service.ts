import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  responseJson: any = {};
  error: boolean = false;
  constructor() { }

  getState() {
    return this.responseJson["state"];
  }

  getCity() {
    return this.responseJson["city"];
  }

  getStreet() {
    return this.responseJson["street"];
  }

  getLatLong() {
    return this.responseJson["latLong"];
  }

  setError(error) {
    this.error = error;
  }

  isError() {
    return this.error === true; 
  }

  static getImgLoc(weatherCode: number) {
    const weatherMap: { [key: number]: string; } = {
      0: "clear_day",
      4201: "rain_heavy",
      4001: "rain",
      4200: "rain_light",
      6201: "freezing_rain_heavy",
      6001: "freezing_rain",
      6200: "freezing_rain_light",
      6000: "freezing_drizzle",
      4000: "drizzle",
      7101: "ice_pellets_heavy",
      7000: "ice_pellets",
      7102: "ice_pellets_light",
      5101: "snow_heavy",
      5000: "snow",
      5100: "snow_light",
      5001: "flurries",
      8000: "tstorm",
      2100: "fog_light",
      2000: "fog",
      1001: "cloudy",
      1102: "mostly_cloudy",
      1101: "partly_cloudy_day",
      1100: "mostly_clear_day",
      1000: "clear_day",
      3000: "light_wind",
      3001: "wind",
      3002: "strong_wind"
    };
    let imgLoc = "/assets/symbols/" + weatherMap[weatherCode] + ".svg";
    return imgLoc;
  }

  static getWeatherType(weatherCode: number) {
    let weatherTypes: { [key: number]: string; } = {
      0: "Unknown",
      1000: "Clear",
      1001: "Cloudy",
      1100: "Mostly Clear",
      1101: "Partly Cloudy",
      1102: "Mostly Cloudy",
      2000: "Fog",
      2100: "Light Fog",
      3000: "Light Wind",
      3001: "Wind",
      3002: "Strong Wind",
      4000: "Drizzle",
      4001: "Rain",
      4200: "Light Rain",
      4201: "Heavy Rain",
      5000: "Snow",
      5001: "Flurries",
      5100: "Light Snow",
      5101: "Heavy Snow",
      6000: "Freezing Drizzle",
      6001: "Freezing Rain",
      6200: "Light Freezing Rain",
      6201: "Heavy Freezing Rain",
      7000: "Ice Pellets",
      7101: "Heavy Ice Pellets",
      7102: "Light Ice Pellets",
      8000: "Thunderstorm"
    }
    return weatherTypes[weatherCode]
  }

  isEmpty(): boolean {
    return Object.keys(this.responseJson).length === 0;
  }

  getDailyChartData() {
    let data = this.responseJson["response"];
    let _intervals = data.data.timelines[1].intervals;
    let date = data.data.timelines[1].startTime;
    let parsed = _intervals.map(function (i: any) {
      return [i.values.temperatureMax, i.values.temperatureMin];
    });
    return { time: date, intervals: parsed };
  }

  getMeteoData() {
    let mData = this.responseJson["response"];
    let _intervals = mData.data.timelines[0].intervals;
    let parsed = _intervals.map(function(i:any) {
      return {
        startTime: i.startTime.slice(0,-6),
        values : {
          temperature: i.values.temperature,
          pressureSeaLevel: i.values.pressureSeaLevel,
          windSpeed: i.values.windSpeed,
          windDirection: i.values.windDirection,
          humidity: i.values.humidity
        }
      }
    }
    );
    return parsed;
  }

  getDayData() {
    let data = this.responseJson["response"];
    let _intervals = data.data.timelines[1].intervals;
    let parsed = _intervals.map(function (i: any) {
      return {
        startTime: i.startTime,
        imgLoc: DataService.getImgLoc(i.values.weatherCode),
        weatherStatus: DataService.getWeatherType(i.values.weatherCode),
        tempMax: i.values.temperatureMax,
        tempMin: i.values.temperatureMin,
        windSpeed: i.values.windSpeed,
      }
    });
    return parsed;
  }

  getDetailedData(time: any): Observable<any> {
    let data = this.responseJson["response"];
    let _intervals = data.data.timelines[1].intervals;
    let parsed = _intervals.find(i => i.startTime === time);
    parsed = {
      startTime: parsed.startTime,
      weatherStatus: DataService.getWeatherType(parsed.values.weatherCode),
      tempMax: parsed.values.temperatureMax,
      tempMin: parsed.values.temperatureMin,
      apparentTemp: parsed.values.temperatureApparent,
      sunRise: parsed.values.sunriseTime,
      sunSet: parsed.values.sunsetTime,
      humidity: parsed.values.humidity,
      windSpeed: parsed.values.windSpeed,
      visibility: parsed.values.visibility,
      cloudCover: parsed.values.cloudCover,
      latLong: this.responseJson["latLong"],
      city: this.getCity(),
      state: this.getState(),
      street: this.responseJson["street"]

    }
    return of(parsed);
  }
}
