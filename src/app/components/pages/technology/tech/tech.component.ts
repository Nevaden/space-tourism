import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';


@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css']
})
export class TechComponent implements OnInit {
  technology: any;

  tech: any = {};
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
        this.tech = data['Tech']
        for (let i = 0; i < this.tech.length; i++){
          if (this.tech[i].name.trim() == this.id.name.trim()) {
            this.tech = this.tech[i]
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
        this.technology = this.technology.technology
      });
    } else{
      this.technology = sessionStorage.getItem('technology')
      this.technology =  JSON.parse(this.technology)
      this.technology = this.technology.technology
      return true;
    }
  }
}
