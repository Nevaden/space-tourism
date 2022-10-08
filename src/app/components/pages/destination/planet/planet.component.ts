import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';


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
    this.GetData();

    
    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']  
      }
    )



    this.route.data.subscribe(
      (data: Data) => {
        this.planet = data['Planet']
        for (let i = 0; i < this.planet.length; i++){
          if (this.planet[i].name.trim() == this.id.name.trim()) {
            this.planet = this.planet[i]
          }
        }
      }
    );


  }




  GetSessionData(){
    this.dataService.getSessionData("destination",this.id.name).subscribe((data) => {
      this.planet = data;
      console.log(this.planet, "data session")
      for (let i = 0; i < this.planet.length; i++){
        if (this.planet[i].name.trim() == this.id.name.trim()) {
          this.planet = this.planet[i]
        }
      }    
    })
  }
  
  GetData(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined) {
      return this.dataService.getData('destination').subscribe((data) =>{
        this.destination = {'destination': data};
        console.log(this.destination,"data")
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



}

