import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Planet } from '../interfaces/planet';
import { Observable } from 'rxjs'
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<Planet> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Planet> 
  | Promise<Planet> | Planet  {
    // let returnValue = sessionStorage.getItem(route.params['id'])
    // return sessionStorage.getItem(route.params['id'])
    return this.dataService.getDataPlanet(route.parent?.routeConfig?.path!,route.params['id'] )
  }


}
