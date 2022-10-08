import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destination: any;
  id: any;
  found: boolean | undefined = false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.id = this.router.url.split("/")
    this.id = this.id[this.id.length-1]
    this.GetData();




    for (let i = 0; i < this.destination.length; i++){
      if (this.id == this.destination[i].name ){
        this.router.navigate(['/destination', this.destination[i].name]) 
        this.found = true;
        break;
      } 
    };
  }


  
  GetData(){

    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined) {
      return this.dataService.getData('destination').subscribe((data) =>{

        this.destination = {'destination': data};
        sessionStorage.setItem('destination',JSON.stringify(this.destination) );
        this.destination = sessionStorage.getItem('destination');
        this.destination =  JSON.parse(this.destination);
        this.destination = this.destination.destination;
        if (!this.found || this.id == undefined ){
          this.matchPage();
        } 
      });
    } else{
      this.destination = sessionStorage.getItem('destination');
      this.destination =  JSON.parse(this.destination);
      this.destination = this.destination.destination;
    }
    if (!this.found || this.id == undefined ){
      this.matchPage();
    } 
    return true;
  }

  matchPage(){
    for (let i = 0; i < this.destination.length; i++){
      if (this.id == this.destination[i].name ){
        this.router.navigate(['/destination', this.destination[i].name]) 
        this.found = true;
        break;
      } 
    }
    if (!this.found){
      this.router.navigate(['/destination', this.destination[0].name]) 
    }
    ;
  }

}
