import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  destinations: any;
  planets: any = [];
  planet: any = {};
  id: any= null;
  subscriptionItem: any;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.GetData();

    this.subscriptionItem = this.route.params.subscribe(
      (params: Params) => {
        this.id = {name: params['id']};
        this.planets = this.dataService.getData('destinations');
        console.log(this.planets,"planets");
        this.planets = this.planets.find((p: any) => p.name==this.id);  
      }
    );
    // this.id = {
    //   name: this.route.snapshot.params['id'],   
    // }
    

    // for (let i = 0; i < this.destinations.length; i++){
    //   this.planets[this.destinations[i].name] = this.destinations[i]
     
    // }


  



    // this.id = this.id.name.replace(/\s+/g, "")
    // this.planet = this.planets[this.id] 
    // console.log(this.planet);
    // for (let i = 0; i < this.destinations.length; i++){
    //   if (this.id == this.destinations[i].name ){
    //     this.planet = this.destinations[i] 
    //     console.log(this.planet ,"who am i?")
    //     break;
    //   } 
    // };
  }


  
  GetData(){
    if(sessionStorage.getItem('destinations')==null || sessionStorage.getItem('destinations')==undefined) {
      return this.dataService.getData('destinations').subscribe((data) =>{
        this.destinations = {'destinations': data};
        sessionStorage.setItem('destinations',JSON.stringify(this.destinations) );
        this.destinations = sessionStorage.getItem('destinations');
        this.destinations =  JSON.parse(this.destinations);
        this.destinations = this.destinations.destinations;

      });
    } else{
      this.destinations = sessionStorage.getItem('destinations');
      this.destinations =  JSON.parse(this.destinations);
      this.destinations = this.destinations.destinations;
      return true;
    }
  }


}

