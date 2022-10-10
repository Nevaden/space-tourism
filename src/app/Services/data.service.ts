import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  firebaseURL= 'https://space-tourism-8e141-default-rtdb.firebaseio.com/'
  fieldUrl: any;
  jsonEXT = '.json'
  output: any = [];

  url = `${this.firebaseURL}${this.jsonEXT}`
  data: any;

  constructor( private http: HttpClient,
    ) { }

  getData(field: string): Observable<any>{
    this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    console.log("server access")
    return this.http.get(this.fieldUrl)
  }

  getDataPage(field: string, subPage: string){ 
    this.data = sessionStorage.getItem(field)
    this.data = JSON.parse(this.data)
    // console.log(this.data,"before sub")
    // this.data = this.data[subPage];
    // console.log(this.data,"after sub")
    return this.data
  }

   

}
  
