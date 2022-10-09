import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  destination: any;
  planets: any = [];
  planet: any = {};
  id: any= null;
  image: any;
  backgrounditem: any;
  found: boolean | undefined;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = {
      name: this.route.snapshot.params['id'],   
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']  
      }
    )
      this.getResolverData();
      this.InitialLoad();
  }


   getResolverData(){
    this.route.data.subscribe(
      (data: Data) => {
        this.planets = data['Planet']
        for (let i = 0; i < this.planets.length; i++){
          if (this.planets[i].name.trim() == this.id.name.trim()) {
            this.planet = this.planets[i] 
          }
        }
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

   
    for (let i = 0; i < this.planets.length; i++){
      if (this.planets[i].name.trim() == this.id.name.trim()) {
       
        this.planet = this.planets[i] 
      }
    }
  }
  InitialLoad(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined){
      setTimeout(() => {
        this.firstLoad();
      }, 150);
    }
  }


}
