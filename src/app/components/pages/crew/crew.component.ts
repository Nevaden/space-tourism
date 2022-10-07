import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit {
  crew: any;
  id: any;
  found: any;

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.GetData();
    this.id = this.router.url.split("/")
    this.id = this.id[this.id.length-1]


    for (let i = 0; i < this.crew.length; i++){
      if (this.id == this.crew[i].name ){
        this.router.navigate(['/destination', this.crew[i].name]) 
        this.found = true;
        break;
      } 
    };
  }

  GetData(){
    if(sessionStorage.getItem('crew')==null || sessionStorage.getItem('crew')==undefined) {
      return this.dataService.getData('crew').subscribe((data) =>{
        this.crew = {'crew': data}
        sessionStorage.setItem('crew',JSON.stringify(this.crew) )
        this.crew = sessionStorage.getItem('crew')
        this.crew =  JSON.parse(this.crew)
        this.crew = this.crew.crew
        if (!this.found || this.id == undefined ){
          this.router.navigate(['/crew', this.crew[0].name]) 
        }        
      });
    } else{
      this.crew = sessionStorage.getItem('crew')
      this.crew =  JSON.parse(this.crew)
      this.crew = this.crew.crew
      if (!this.found || this.id == undefined ){
        this.router.navigate(['/crew', this.crew[0].name]) 
      }   
      return true;
    }
  }

}
