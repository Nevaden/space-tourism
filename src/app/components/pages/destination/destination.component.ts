import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destination: any;
  id: any;
  data: any;
  storeObject: object = {};
  testObj: any;
  found: boolean | undefined = false;

  constructor(private dataService: DataService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.router.url.split("/")
    this.id = this.id[this.id.length-1]
    this.GetData();
  }


  
  GetData(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined) {
      return this.dataService.getData('destination').subscribe((data) =>{
        this.destination = {};
        for (let i = 0; i < data.length; i++){
          this.destination[data[i].name] = data[i];
        }
        sessionStorage.setItem('destination',JSON.stringify(this.destination));
        this.destination = sessionStorage.getItem('destination');
        this.destination =  JSON.parse(this.destination);
        if (!this.found || this.id == undefined ){
          this.matchPage();
        } 
      });
    } else{
      this.destination = sessionStorage.getItem('destination');
      this.destination =  JSON.parse(this.destination);
    }
    if (!this.found || this.id == undefined ){
      this.matchPage();
    } 
    return true;
  }

  matchPage(){
    if (Object.keys(this.destination).includes(this.id) ){
      this.router.navigate(['/destination', this.id]) 
      this.found = true;   
    } 
    
    if (!this.found){
      this.router.navigate(['/destination', Object.keys(this.destination)[0]]) 
    }; 
  }
}
