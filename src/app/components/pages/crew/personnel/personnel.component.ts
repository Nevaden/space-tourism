import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  crew: any;
  person: any = {};
  id: any= null;
  image: any;
  backgrounditem: any;
  constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.id = {
        name: this.route.snapshot.params['id'],   
      }
      this.route.params.subscribe(
        (params: Params) => {
          this.id.name = params['id']  
        }
      )
        this.getResolverData();
        this.InitialLoad();
    }

  getResolverData(){
    this.route.data.subscribe(
      (data: Data) => {
        this.crew = data['Person']
        for (let i = 0; i < this.crew.length; i++){
          if (this.crew[i].name.trim() == this.id.name.trim()) {
            this.person = this.crew[i]
          }
        }
      }
    );  
  }

  UpdateBackground(){
    if (window.innerWidth > 1199 ) {
      return this.image = this.person.images.webp
    } else {
      return this.image = this.person.images.png  
    }  
  }

  getImage(): Observable<string> {
    this. backgrounditem = this.UpdateBackground()
    return this.backgrounditem;
  }

  firstLoad(){
    this.crew =  sessionStorage.getItem('crew')
    this.crew = JSON.parse(this.crew)

   
    for (let i = 0; i < this.crew.length; i++){
      if (this.crew[i].name.trim() == this.id.name.trim()) {
       
        this.person = this.crew[i] 
      }
    }
  }
  InitialLoad(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined){
      setTimeout(() => {
        this.firstLoad();
      }, 1000);
    }
  }




}
