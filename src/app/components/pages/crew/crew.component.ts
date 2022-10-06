import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit {
  crew: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.GetData();
  }

  GetData(){
    if(sessionStorage.getItem('crew')==null || sessionStorage.getItem('crew')==undefined) {
      return this.dataService.getData('crew').subscribe((data) =>{
        this.crew = {'crew': data}
        sessionStorage.setItem('crew',JSON.stringify(this.crew) )
        this.crew = sessionStorage.getItem('crew')
        this.crew =  JSON.parse(this.crew)
        this.crew = this.crew.crew
      });
    } else{
      this.crew = sessionStorage.getItem('crew')
      this.crew =  JSON.parse(this.crew)
      this.crew = this.crew.crew
      return true;
    }
  }

}
