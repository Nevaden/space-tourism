import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  technology: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.GetData();
  }
 GetData(){
    if(sessionStorage.getItem('technology')==null || sessionStorage.getItem('technology')==undefined) {
      return this.dataService.getData('technology').subscribe((data) =>{
        this.technology = {'technology': data}
        sessionStorage.setItem('technology',JSON.stringify(this.technology) )
        this.technology = sessionStorage.getItem('technology')
        this.technology =  JSON.parse(this.technology)
        this.technology = this.technology.technology
        console.log(this.technology,"MY TECH OBJ")
      });
    } else{
      this.technology = sessionStorage.getItem('technology')
      this.technology =  JSON.parse(this.technology)
      this.technology = this.technology.technology
      return true;
    }
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
