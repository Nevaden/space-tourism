import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinations: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.GetData();
  }


  GetData(){
    if(sessionStorage.getItem('destinations')==null || sessionStorage.getItem('destinations')==undefined) {
      return this.dataService.getData('destinations').subscribe((data) =>{
        this.destinations = {'destinations': data}
        sessionStorage.setItem('destinations',JSON.stringify(this.destinations) )
        this.destinations = sessionStorage.getItem('destinations')
        this.destinations =  JSON.parse(this.destinations)
        this.destinations = this.destinations.destinations
      });
    } else{
      this.destinations = sessionStorage.getItem('crew')
      this.destinations =  JSON.parse(this.destinations)
      this.destinations = this.destinations.destinations
      return true;
    }
  }

}
