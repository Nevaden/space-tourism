import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  destination: any;
  destinations: any;
  planets: any = [];
  planet: any = {};
  id: any= null;
  image: any;
  backgrounditem: any;
  found: boolean | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
    this.getResolverData();
    this.InitialLoad();
  }

  getParams(){
    this.id = {
      name: this.route.snapshot.params['id'],   
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']  
      }
    )
  }
   getResolverData(){
    this.route.data.subscribe(
      (data: Data) => {
        this.planets = data['Planet'];
        this.destinations = Object.keys(this.planets)
        this.planet = this.planets[this.id.name]
      }
    );
  }


  UpdateBackground(){
    if (window.innerWidth > 1199 ) {
      return this.image = this.planet.images.webp
    } else {
      return this.image = this.planet.images.png
    }  
  }

  getImage(): Observable<string> {
    this.backgrounditem = this.UpdateBackground()
    return this.backgrounditem;
  }

  firstLoad(){
    this.planets =  sessionStorage.getItem('destination')
    this.planets = JSON.parse(this.planets)
    this.destinations = Object.keys(this.planets)
    this.planet = this.planets[this.id.name]
  }

  InitialLoad(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined){
      setTimeout(() => {
        this.firstLoad();
      }, 100);
    }
  }


}
