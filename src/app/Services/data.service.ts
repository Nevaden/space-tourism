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

  getDataDirect(field: string) {
    this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    this.data = this.http.get(this.fieldUrl);
    this.data = JSON.parse(this.data)
    return this.data;
  }

  async getDataPlanet(field: string, subPage: string){
    // this.fieldUrl = `${this.firebaseURL}${field}${this.jsonEXT}`
    // this.data = this.http.get(this.fieldUrl)
    
    this.test = sessionStorage.getItem(field)
    this.test = JSON.parse(this.test)
    return this.test
  }

  getSessionData(page: string, subPage: string): Observable<any>{
    this.data = sessionStorage.getItem('destination');
    if(typeof this.data=='string' ||typeof this.data==undefined){
      this.parsedData = JSON.parse(this.data)
      return of(this.parsedData)
    } else{
      this.getData(page);
      this.parsedData = JSON.parse(this.data!) 
    return this.parsedData;

    }
  }
   
    // for (let i = 0; i < this.data.length; i++){
    //   if(this.data[i].name.trim() == subPage.trim()){
        
    //     this.data = this.data[i];
    //   }
    // }
}
  
