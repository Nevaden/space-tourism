import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  
  constructor( private http: HttpClient,
    ) { }


  getData(field: string): Observable<any>{
    this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    return this.http.get(this.fieldUrl)
  }

  getDataPlanet(field: string, subPage: string): Observable<any>{
    this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    this.data = this.http.get(this.fieldUrl)
    return this.http.get(this.fieldUrl)
  }

}