import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
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
  crewMembers: any;
  constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.getParams();
      this.getResolverData();
      this.InitialLoad();
    }

  getParams(){
    this.id = {
      name: this.route.snapshot.params['id'],   
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']  
      }
    )
  }
getResolverData(){
  this.route.data.subscribe(
    (data: Data) => {
      console.log(data)
      this.crew = data['Person']
      this.crewMembers = Object.keys(this.crew)
      this.person = this.crew[this.id.name]
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
    this.crew =  sessionStorage.getItem('destination')
    this.crew = JSON.parse(this.crew)
    this.crewMembers = Object.keys(this.crew)
    this.person = this.person[this.id.name]
  }

  InitialLoad(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined){
      setTimeout(() => {
        this.firstLoad();
      }, 100);
    }
  }




}
