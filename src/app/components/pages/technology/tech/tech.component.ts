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
  
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = {
      name: this.route.snapshot.params['id'],   
    }
    
    this.route.params.subscribe(
      (params: Params) => {
        this.id.name = params['id']    
      }
    )
  this.getResolver();
}


  getResolver() {
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



  GetData(){
    if(sessionStorage.getItem('technology')==null || sessionStorage.getItem('technology')==undefined) {
      return this.dataService.getData('technology').subscribe((data) =>{
        this.technology = {'technology': data}
        sessionStorage.setItem('technology',JSON.stringify(this.technology) )
        this.technology = sessionStorage.getItem('technology')
        this.technology =  JSON.parse(this.technology)
      });
    } else{
      this.technology = sessionStorage.getItem('technology')
      this.technology =  JSON.parse(this.technology)
      this.technology = this.technology.technology
      return this.technology;
    }
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

}
