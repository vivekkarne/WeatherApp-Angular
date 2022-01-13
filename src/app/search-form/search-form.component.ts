import { DataService } from './../services/data.service';
import { BackendService } from './../services/backend.service';
import { GeocodingService } from './../services/geocoding.service';
import { IpinfoService } from './../services/ipinfo.service';
import { AutocompleteService } from './../services/autocomplete.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() clear = new EventEmitter<boolean>();
  @Output() newResponseEvent = new EventEmitter<any>();
  @Output() isLoadingEvent = new EventEmitter<boolean>();
  @Output() isGeoError = new EventEmitter<boolean>();
  @Output() isResponse = new EventEmitter<boolean>();

  states = [
    {
      "name": "Alabama",
      "abbreviation": "AL"
    },
    {
      "name": "Alaska",
      "abbreviation": "AK"
    },
    {
      "name": "American Samoa",
      "abbreviation": "AS"
    },
    {
      "name": "Arizona",
      "abbreviation": "AZ"
    },
    {
      "name": "Arkansas",
      "abbreviation": "AR"
    },
    {
      "name": "California",
      "abbreviation": "CA"
    },
    {
      "name": "Colorado",
      "abbreviation": "CO"
    },
    {
      "name": "Connecticut",
      "abbreviation": "CT"
    },
    {
      "name": "Delaware",
      "abbreviation": "DE"
    },
    {
      "name": "District Of Columbia",
      "abbreviation": "DC"
    },
    {
      "name": "Federated States Of Micronesia",
      "abbreviation": "FM"
    },
    {
      "name": "Florida",
      "abbreviation": "FL"
    },
    {
      "name": "Georgia",
      "abbreviation": "GA"
    },
    {
      "name": "Guam",
      "abbreviation": "GU"
    },
    {
      "name": "Hawaii",
      "abbreviation": "HI"
    },
    {
      "name": "Idaho",
      "abbreviation": "ID"
    },
    {
      "name": "Illinois",
      "abbreviation": "IL"
    },
    {
      "name": "Indiana",
      "abbreviation": "IN"
    },
    {
      "name": "Iowa",
      "abbreviation": "IA"
    },
    {
      "name": "Kansas",
      "abbreviation": "KS"
    },
    {
      "name": "Kentucky",
      "abbreviation": "KY"
    },
    {
      "name": "Louisiana",
      "abbreviation": "LA"
    },
    {
      "name": "Maine",
      "abbreviation": "ME"
    },
    {
      "name": "Marshall Islands",
      "abbreviation": "MH"
    },
    {
      "name": "Maryland",
      "abbreviation": "MD"
    },
    {
      "name": "Massachusetts",
      "abbreviation": "MA"
    },
    {
      "name": "Michigan",
      "abbreviation": "MI"
    },
    {
      "name": "Minnesota",
      "abbreviation": "MN"
    },
    {
      "name": "Mississippi",
      "abbreviation": "MS"
    },
    {
      "name": "Missouri",
      "abbreviation": "MO"
    },
    {
      "name": "Montana",
      "abbreviation": "MT"
    },
    {
      "name": "Nebraska",
      "abbreviation": "NE"
    },
    {
      "name": "Nevada",
      "abbreviation": "NV"
    },
    {
      "name": "New Hampshire",
      "abbreviation": "NH"
    },
    {
      "name": "New Jersey",
      "abbreviation": "NJ"
    },
    {
      "name": "New Mexico",
      "abbreviation": "NM"
    },
    {
      "name": "New York",
      "abbreviation": "NY"
    },
    {
      "name": "North Carolina",
      "abbreviation": "NC"
    },
    {
      "name": "North Dakota",
      "abbreviation": "ND"
    },
    {
      "name": "Northern Mariana Islands",
      "abbreviation": "MP"
    },
    {
      "name": "Ohio",
      "abbreviation": "OH"
    },
    {
      "name": "Oklahoma",
      "abbreviation": "OK"
    },
    {
      "name": "Oregon",
      "abbreviation": "OR"
    },
    {
      "name": "Palau",
      "abbreviation": "PW"
    },
    {
      "name": "Pennsylvania",
      "abbreviation": "PA"
    },
    {
      "name": "Puerto Rico",
      "abbreviation": "PR"
    },
    {
      "name": "Rhode Island",
      "abbreviation": "RI"
    },
    {
      "name": "South Carolina",
      "abbreviation": "SC"
    },
    {
      "name": "South Dakota",
      "abbreviation": "SD"
    },
    {
      "name": "Tennessee",
      "abbreviation": "TN"
    },
    {
      "name": "Texas",
      "abbreviation": "TX"
    },
    {
      "name": "Utah",
      "abbreviation": "UT"
    },
    {
      "name": "Vermont",
      "abbreviation": "VT"
    },
    {
      "name": "Virgin Islands",
      "abbreviation": "VI"
    },
    {
      "name": "Virginia",
      "abbreviation": "VA"
    },
    {
      "name": "Washington",
      "abbreviation": "WA"
    },
    {
      "name": "West Virginia",
      "abbreviation": "WV"
    },
    {
      "name": "Wisconsin",
      "abbreviation": "WI"
    },
    {
      "name": "Wyoming",
      "abbreviation": "WY"
    }
  ]
  
  isIpInfo: boolean = false;
  ipData: { [key:string]:string} = {};

  cityPairs: Observable<any> | undefined;

  searchForm: FormGroup = new FormGroup({
    state: new FormControl({ value: 'CA', disabled: false }),
    street: new FormControl({ value: '', disabled: false }, [Validators.required, this.spaceValidator(/\S/i)]),
    city: new FormControl({ value: '', disabled: false }, [Validators.required, this.spaceValidator(/\S/i)]),
    autoDetect: new FormControl(''),
  });

  constructor(private autocomplete: AutocompleteService, private ipinfoService: IpinfoService, private geoCodingService: GeocodingService,private backend: BackendService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.cityPairs = this.city?.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(value => this.getPairs(value || ''))
    );
    this.ipinfoService.getIpInfo().subscribe(data=> {
      this.ipData["latLong"] = data.loc;
      this.ipData["city"] = data.city;
      this.ipData["state"] = data.region;
      this.isIpInfo = data.loc === '' ? false: true;
    });
  }

  updateState(_state: string) {
    this.state?.setValue(_state);
  }

  get state() { return this.searchForm.get('state'); }

  get street() { return this.searchForm.get('street'); }

  get city() { return this.searchForm.get('city'); }

  get autoDetect() { return this.searchForm.get('autoDetect'); }

  checkToggle(): void {
    if (this.autoDetect?.value) {
      this.state?.disable();
      this.street?.disable();
      this.city?.disable();
      return;
    }
    this.state?.enable();
    this.street?.enable();
    this.city?.enable();
  }

  private getPairs(value: string) {
    if (value !== '' && value.length > 1) {
      let cityState: { city: string, state: string }[] = [];
      this.autocomplete.getOptions(value).subscribe(data => {
        data.predictions.forEach(function (prediction: any) {
          let terms = prediction.terms;
          terms.forEach(function (e: any) {
            if (e.value === "USA") {
              cityState.push({ city: terms[0].value || '', state: terms[1].value || '' });
            }
          });
        })
      });
      return cityState;
    }
    return [];
  }

  spaceValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? null : { space: { value: control.value } };
    };
  }

  loadResultsIP():void {
    let x = this.ipinfoService.getIpInfo().subscribe(data=> {
      this.ipData["latLong"] = data.loc;
      this.ipData["city"] = data.city;
      this.ipData["state"] = data.region;
      this.ipData["street"] = '';
      this.isIpInfo = data.loc === '' ? false: true;
      this.backend.getResponse(this.ipData["latLong"]).subscribe(data=> {
        if(data.hasOwnProperty('name') && data.name === 'Error') {
          this.isLoadingEvent.emit(false);
          this.dataService.setError(true);
          this.dataService.responseJson = {};
          console.log("No data from tomorrow api");
          this.router.navigateByUrl('/results/error');
          return;
        }
        this.dataService.setError(false);
        
        this.ipData["response"] = data;
        this.dataService.responseJson = this.ipData;
        this.newResponseEvent.emit(this.ipData);
        this.isLoadingEvent.emit(false);
        this.router.navigateByUrl('/results/day');
      }, (err)=> {
        console.log(err);
      })
    },
    (err) => { 
      console.log(err); }
    )
  }

  loadResultsGeo():void {
    this.geoCodingService.getGeocoding(`${this.street?.value} ${this.city?.value} ${this.state?.value}`).subscribe(
      data => {       
        this.dataService.setError(false);
        this.ipData["latLong"] = `${data.results[0].geometry.location.lat},${data.results[0].geometry.location.lng}`;
        this.ipData["city"] = this.city?.value;
        this.ipData["state"] = this.state?.value;
        this.ipData["street"] = this.street?.value;
        this.backend.getResponse(this.ipData["latLong"]).subscribe(data=> {
          if(data.hasOwnProperty('name') && data.name === 'Error') {
            this.isLoadingEvent.emit(false);
            console.log("No data from tomorrow api");
            this.dataService.setError(true);
            this.dataService.responseJson = {};
            this.router.navigateByUrl('/results/error');
            return;
          }
          this.dataService.setError(false);
          this.ipData["response"] = data;
          this.dataService.responseJson = this.ipData;
          this.newResponseEvent.emit(this.ipData);
          this.isLoadingEvent.emit(false);
          this.router.navigateByUrl('/results/day');
        },
        (err) => {
          console.log(err);
        })
      },
      (err) => { 
        console.log(err);
        this.isLoadingEvent.emit(false);
        this.dataService.setError(true);
        this.dataService.responseJson = {};
        this.router.navigateByUrl('/results/error');
      }
    );
  }

  onSubmit(): void {
    this.clear.emit(false);
    this.isLoadingEvent.emit(true);
    this.isResponse.emit(false);
    if(this.autoDetect?.value) {
      this.loadResultsIP();
    }
    else {
      this.loadResultsGeo();
    }
  }

  clearForm(): void {
    this.searchForm.reset({
      'state': 'CA'
    });
    this.state?.enable();
    this.street?.enable();
    this.city?.enable();
    this.clear.emit(false);
    this.dataService.responseJson ={};
    this.isResponse.emit(false);
    this.router.navigateByUrl('/results');
  }
}
