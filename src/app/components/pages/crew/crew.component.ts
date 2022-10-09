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
    this.id = this.router.url.split("/")
    this.id = this.id[this.id.length-1]
    this.GetData();
  }

  GetData(){
    if(sessionStorage.getItem('crew')==null || sessionStorage.getItem('crew')==undefined) {
      return this.dataService.getData('crew').subscribe((data) =>{
        this.crew = {"crew":data};
        sessionStorage.setItem('crew',JSON.stringify(this.crew.crew) );
        this.crew = sessionStorage.getItem('crew');
        this.crew =  JSON.parse(this.crew);
        if (!this.found || this.id == undefined ){
          this.matchPage();
        } 
      });
    } else{
      this.crew = sessionStorage.getItem('crew');
      this.crew =  JSON.parse(this.crew);
    }
    if (!this.found || this.id == undefined ){
      this.matchPage();
    } 
    return true;
  }

  matchPage(){
    for (let i = 0; i < this.crew.length; i++){
      if (this.id == this.crew[i].name.replace( " ", '%20') ){
        this.router.navigate(['/crew', this.crew[i].name]) 
        this.found = true;
        break;
      } 
    }
    if (!this.found){
      this.router.navigate(['/crew', this.crew[0].name]) 
    }
    ;
  }
}
