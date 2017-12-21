import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ShareDataService } from "../services/share-data.service";
import { Http, Response, Headers, URLSearchParams,RequestOptions } from '@angular/http';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  providers: []
})
export class SearchInputComponent implements OnInit {



  constructor (
    private formBuilder: FormBuilder,
    private http: Http,
    private shareData: ShareDataService
  ) {}
 
  searchRes:any
  public form: FormGroup;
  locatioControl: FormControl = new FormControl();
  dayControl: FormControl = new FormControl();
  minPriceControl: FormControl = new FormControl();
  maxPriceControl: FormControl = new FormControl();

  

  ngOnInit() {
    this.shareData.getSearchRes().subscribe(res => this.searchRes = res)
    this.form = this.formBuilder.group({ 'range': [ [ 0, 10000000 ] ] });
   
  }
 
 
    locations = [
      {value: 'Los Angeles', viewValue: 'Los Angeles, CA'},
      {value: 'Beverly Hills', viewValue: 'Beverly Hills, CA'},
      {value: 'El Segundo', viewValue: 'El Segundo, CA'},
      {value: 'Culver City', viewValue: 'Culver City, CA'},
      {value: 'Alhambra', viewValue: 'Alhambra, CA'},
      {value: 'Arcadia', viewValue: 'Arcadia, CA'},
      {value: 'Pasadena', viewValue: 'Pasadena, CA'},
      {value: 'Irvine', viewValue: 'Irvine, CA'},
      {value: 'Fountain Valley', viewValue: 'Fountain Valley, CA'},
      {value: 'Garden Grove', viewValue: 'Garden Grove, CA'},
      {value: 'Huntington Beach', viewValue: 'Huntington Beach, CA'},
      {value: 'Irvine', viewValue: 'Irvine, CA'},
      {value: 'Lake Forest', viewValue: 'Lake Forest, CA'},
      {value: 'Orange', viewValue: 'Orange, CA'},
      {value: 'Newport Beach', viewValue: 'Newport Beach, CA'},
      {value: 'Santa Ana', viewValue: 'Santa Ana, CA'},
     ];
  

     days = [
      {value: '1', viewValue: '1 Day'},
      {value: '3', viewValue: '3 Days'},
      {value: '5', viewValue: '5 Days'},
      {value: '10', viewValue: '10 Days'},
      {value: '30', viewValue: '30 Days'},
      {value: '60', viewValue: '60 Days'},
      {value: '90', viewValue: '90 Days'}
     ];
     
    
     private host="http://localhost:9000"
     minPriceData: number=100000
     maxPriceData:number =1000000

    someRange3: number[] = [100000,1000000];
     
     locationData: any
     dayData: any
     houseInfo: any;
     

     search() {
      console.log("1111111111," + this.someRange3 )
       let url =this.host+"/houseinfo/get/subscribed/"+this.dayData+"/"+this.locationData.toLowerCase()+"/"+this.someRange3[0]+"/"+this.someRange3[1];
    //    if(this.restaurantName==undefined || this.restaurantName=="")
    //     url = this.host +"/restaurantinfo/get?page=0&size=100";
    //  //  console.log(url)
       
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      return this.http.get(url).subscribe(data => {
        this.houseInfo = data;
        this.shareData.postSearchRes( data );
        console.log(data);
      });
                     
    }
}