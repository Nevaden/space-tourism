import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinations: any;
  id: any;
  found: boolean = false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.GetData();


    this.id = this.router.url.split("/")
    this.id = this.id[this.id.length-1]


    for (let i = 0; i < this.destinations.length; i++){


      if (this.id == this.destinations[i].name ){
        this.router.navigate(['/destination', this.destinations[i].name]) 
        this.found = true;
        break;
      } 
    };

    if (!this.found ){
      this.router.navigate(['/destination', this.destinations[0].name]) 
    } 

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
