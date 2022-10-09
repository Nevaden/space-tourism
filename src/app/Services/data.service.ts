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
  page: any;
  data: any;
  parsedData: any;
  test: any ;
  // urlCrew = `${this.firebaseURL}${this.crew}${this.jsonEXT}`
  // urlTechnology = `${this.firebaseURL}${this.technology}${this.jsonEXT}`
  // urlDestination = `${this.firebaseURL}${this.destination}${this.jsonEXT}`
  
  constructor( private http: HttpClient,
    ) { }

  // getData(): Observable<any>{
  //   return this.http.get(this.url)
  // }

  getData(field: string): Observable<any>{
    this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    console.log("server access")
    return this.http.get(this.fieldUrl)
  }

  getDataPage(field: string, subPage: string){ 
    this.test = sessionStorage.getItem(field)
    this.test = JSON.parse(this.test)
    return this.test
  }

   

}
  
