import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css']
})
export class TechComponent implements OnInit {
  technology: any;
  image: any;

  tech: any = {};
  id: any= null;
  backgrounditem: any;
  sessionTest: any;
  
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
          this.technology = data['Tech']
          for (let i = 0; i < this.technology.length; i++){
            if (this.technology[i].name.trim() == this.id.name.trim()) {
              this.tech = this.technology[i]  
            }
          }
        }
      );
    }

  UpdateBackground(){
        if (window.innerWidth > 1199 ) {
          return this.image = this.tech.images.portrait
        } else {
          return this.image = this.tech.images.landscape  
        }  
    }
    
  getImage(): Observable<string> {
    this.backgrounditem = this.UpdateBackground()
    return this.backgrounditem;
  }

  firstLoad(){
    this.technology =  sessionStorage.getItem('destination')
    this.technology = JSON.parse(this.technology)
 
   
    for (let i = 0; i < this.technology.length; i++){
      if (this.technology[i].name.trim() == this.id.name.trim()) {
       
        this.tech = this.technology[i] 
      }
    }
  }
  InitialLoad(){
    if(sessionStorage.getItem('destination')==null || sessionStorage.getItem('destination')==undefined){
      setTimeout(() => {
        this.firstLoad();
      }, 200);
    }
  } 


}
