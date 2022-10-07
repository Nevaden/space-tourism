import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

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
  subscriptionItem: any;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.GetData();
    
    this.id = {
      name: this.route.snapshot.params['id'],   
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']
      }
    )


    this.route.data.subscribe(
      (data: Data) => {
        this.planet = data['Planet']
        console.log(this.planet,"planet")
        for (let i = 0; i < this.planet.length; i++){
          console.log(this.planet[i].name.trim() , this.id.name.trim(), "this is our check")
          if (this.planet[i].name.trim() == this.id.name.trim()) {
            this.planet = this.planet[i]
          }
        }
      }
    );




  }


  
  GetData(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined) {
      return this.dataService.getData('destination').subscribe((data) =>{
        this.destination = {'destination': data};
        sessionStorage.setItem('destination',JSON.stringify(this.destination) );
        this.destination = sessionStorage.getItem('destination');
        this.destination =  JSON.parse(this.destination);
        this.destination = this.destination.destination;

      });
    } else{
      this.destination = sessionStorage.getItem('destination');
      this.destination =  JSON.parse(this.destination);
      this.destination = this.destination.destination;
      return true;
    }
  }


}

