import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ShareDataService } from "../services/share-data.service";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { EmailValidator } from '@angular/forms/src/directives/validators';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material';

import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})

export class SubscriptionComponent implements OnInit {
  @Input('matChipInputFor')
  chipList: MatChipInputEvent
 
  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private shareData: ShareDataService,
    public snackBar: MatSnackBar
  ) { }

  searchRes: any
  public form: FormGroup;
  firstNameControl: FormControl = new FormControl();
  lastNameControl: FormControl = new FormControl();
  locationControl: FormControl = new FormControl();
  dayControl: FormControl = new FormControl();
  minPriceControl: FormControl = new FormControl();
  maxPriceControl: FormControl = new FormControl();
  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  ngOnInit() {
    this.shareData.getSearchRes().subscribe(res => this.searchRes = res)
    this.form = this.formBuilder.group({ 'range': [[0, 10000000]] });
  }


  locations = [
    { value: 'Los Angeles', viewValue: 'Los Angeles, CA' },
    { value: 'Beverly Hills', viewValue: 'Beverly Hills, CA' },
    { value: 'El Segundo', viewValue: 'El Segundo, CA' },
    { value: 'Culver City', viewValue: 'Culver City, CA' },
    { value: 'Alhambra', viewValue: 'Alhambra, CA' },
    { value: 'Arcadia', viewValue: 'Arcadia, CA' },
    { value: 'Pasadena', viewValue: 'Pasadena, CA' },
    { value: 'Irvine', viewValue: 'Irvine, CA' },
    { value: 'Fountain Valley', viewValue: 'Fountain Valley, CA' },
    { value: 'Garden Grove', viewValue: 'Garden Grove, CA' },
    { value: 'Huntington Beach', viewValue: 'Huntington Beach, CA' },
    { value: 'Irvine', viewValue: 'Irvine, CA' },
    { value: 'Lake Forest', viewValue: 'Lake Forest, CA' },
    { value: 'Orange', viewValue: 'Orange, CA' },
    { value: 'Newport Beach', viewValue: 'Newport Beach, CA' },
    { value: 'Santa Ana', viewValue: 'Santa Ana, CA' },
  ];


  days = [
    { value: '1', viewValue: '1 Day' },
    { value: '3', viewValue: '3 Days' },
    { value: '5', viewValue: '5 Days' },
    { value: '10', viewValue: '10 Days' },
    { value: '30', viewValue: '30 Days' },
    { value: '60', viewValue: '60 Days' },
    { value: '90', viewValue: '90 Days' }
  ];



  minPriceData: number = 100000
  maxPriceData: number = 1000000
  emailData: String
  someRange3: number[] = [100000, 1000000];


  dayData: any
  houseInfo: any;
  cityData: String
  firstName: String
  lastName: String




  // Enter, comma



  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];


  locationData = []


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.locationData.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(location: any): void {
    let index = this.locationData.indexOf(location);

    if (index >= 0) {
      this.locationData.splice(index, 1);
    }
  }


  emailVaildation() {
    console.log(this.emailData)

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var test = re.test(this.emailData.toLowerCase());

    if (test == false) {
      this.emailData = ""
      console.log("Invaild email address, set to undefine, this.emailData: " + this.emailData)
      return false
    }
    else {
      this.emailData = this.emailData.toLowerCase()
      console.log("pass email reg test. This email address is a vaild address: " + this.emailData)
      return true
    }
    
  }


  subscribe() {
    
    //Input clean up and vaildation
    
    for (var i = 0; i < this.locationData.length; i++) {
      this.locationData[i] = this.locationData[i].toLowerCase()
    }
    var userInfo =
      {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.emailData,
        "lowPrice": this.someRange3[0],
        "highPrice": this.someRange3[1],
        "city": this.locationData
      }
   // console.log(userInfo)

    if (this.emailVaildation() == false) {
      console.log("Post error, email address is Invaild.")
      this.snackBar.open('Email address is Invaild', 'X', {
        duration: 2000
      });
    }
    else {
      var url = "http://localhost:9001/userinfo/post"
      this.http.post(url, userInfo).subscribe((data) => {
        console.log("Post success.");
        console.log(userInfo);
        this.snackBar.open('Subscribe success', 'X', {
          duration: 2000
        });
      },
      error => {
        this.snackBar.open('Subscribe failed', 'X', {
          duration: 2000
        });
      });
    }
  }




}
