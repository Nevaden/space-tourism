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


    for (let i = 0; i < this.technology.length; i++){
      if (this.id == this.technology[i].name ){
        this.router.navigate(['/technology', this.technology[i].name]) 
        this.found = true;
        break;
      } 
    };

  }
 GetData(){
    if(sessionStorage.getItem('technology')==null || sessionStorage.getItem('technology')==undefined) {
      return this.dataService.getData('technology').subscribe((data) =>{
        this.technology = {'technology': data}
        sessionStorage.setItem('technology',JSON.stringify(this.technology) )
        this.technology = sessionStorage.getItem('technology')
        this.technology =  JSON.parse(this.technology)
        this.technology = this.technology.technology;
        if (!this.found || this.id == undefined ){
          this.matchPage();
        }   
      });
    } else{
      this.technology = sessionStorage.getItem('technology')
      this.technology =  JSON.parse(this.technology)
      this.technology = this.technology.technology;
      if (!this.found || this.id == undefined ){
        this.matchPage();
      }   
      return true;
    }
  }

  matchPage(){
    for (let i = 0; i < this.technology.length; i++){
      if (this.id == this.technology[i].name.replace( " ", '%20') ){
        this.router.navigate(['/technology', this.technology[i].name]) 
        this.found = true;
        break;
      } 
    }
    if (!this.found){
      this.router.navigate(['/technology', this.technology[0].name]) 
    }
    ;
  }

  // GetData(){
  //   if(sessionStorage.getItem('technology')==null) {
  //     return this.dataService.getData().subscribe((data) =>{
  //       sessionStorage.setItem('technology',JSON.stringify(data.technology) )
  //       sessionStorage.setItem('destinations',JSON.stringify(data.destinations) )
  //       sessionStorage.setItem('crew',JSON.stringify(data.crew) )
  //       this.technology = sessionStorage.getItem('technology');
  //       this.technology = JSON.parse(this.technology);
  //     });
  //   } else{
  //     return true;
  //   }
  // }


}
