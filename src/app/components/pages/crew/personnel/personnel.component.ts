import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  crew: any;
  person: any = {};
  id: any= null;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
   this.id = {
      name: this.route.snapshot.params['id'],   
    }
    this.GetData();

    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']  
      }
    )

      this.route.data.subscribe(
      (data: Data) => {
        this.person = data['Person']
        for (let i = 0; i < this.person.length; i++){
          if (this.person[i].name.trim() == this.id.name.trim()) {
            this.person = this.person[i]
          }
        }
      }
    );  
    
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
