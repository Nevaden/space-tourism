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
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
   this.id = {
      name: this.route.snapshot.params['id'],   
    }
    // this.GetData();
    this.getResolverData();
    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']  
      }
    )


    
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


}
