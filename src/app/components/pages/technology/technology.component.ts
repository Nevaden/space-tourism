import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  technology: any;
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
      if(sessionStorage.getItem('technology')==null || sessionStorage.getItem('technology')==undefined) {
        return this.dataService.getData('technology').subscribe((data) =>{
          this.technology = {};
          for (let i = 0; i < data.length; i++){
            this.technology[data[i].name] = data[i];
          }          
          sessionStorage.setItem('technology',JSON.stringify(this.technology));
          this.technology = sessionStorage.getItem('technology');
          this.technology =  JSON.parse(this.technology);
          if (!this.found || this.id == undefined ){
            this.matchPage();
          } 
        });
      } else{
        this.technology = sessionStorage.getItem('technology');
        this.technology =  JSON.parse(this.technology);
      }
      if (!this.found || this.id == undefined ){
        this.matchPage();
      } 
      return true;
    }

  matchPage(){
    if (Object.keys(this.technology).includes(this.id.replace( "%20", " ")) ){
      this.router.navigate(['/technology', this.id.replace('%20'," ")]) 
      this.found = true;
    } 
    if (!this.found){
      this.router.navigate(['/technology', Object.keys(this.technology)[0]]) 
    }
    ;
  }
}
