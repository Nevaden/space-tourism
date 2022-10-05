import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  firebaseURL= 'https://space-tourism-8e141-default-rtdb.firebaseio.com/'
  jsonEXT = '.json'

  url = `${this.firebaseURL}${this.jsonEXT}`

  
  constructor( private http: HttpClient,
    ) { }

  getData(): Observable<any>{
    return this.http.get(this.url)
  }


  }