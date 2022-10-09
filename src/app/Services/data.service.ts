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
    return this.http.get(this.fieldUrl)
  }

  getDataDirect(field: string) {
    this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    this.data = this.http.get(this.fieldUrl);
    console.log("did we do this?", this.data)
    return this.data;
  }

  getDataPlanet(field: string, subPage: string): Observable<any>{
    this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    this.data = this.http.get(this.fieldUrl)
    return this.http.get(this.fieldUrl)
  }

  getSessionData(page: string, subPage: string){
    this.data = JSON.parse(sessionStorage.getItem('destination')!)
    for (let i = 0; i < this.data.length; i++){
      if(this.data[i].name.trim() == subPage.trim()){
        this.data = this.data[i];
      }
    }
   
    return this.data;
  }
}