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

  url = `${this.firebaseURL}${this.jsonEXT}`
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

}