import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  data: any;
  navDestination: any;
  destination: any;
  navCrew: any;
  navTechnology: any;
  parentPath: any; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub();
  }
  routeSub(){
  
    this.route.url.subscribe(m => this.parentPath = m[0].path)

    // if(this.parentPath == "destination"){
    //   if(this.destination==null ||this.destination==undefined ){
    //     console.log(this.destination,"wma I really null?")
    //     this.data = sessionStorage.getItem('destination')
    //     this.destination = JSON.parse(this.data)
    //     console.log(this.destination)
    //     this.navDestination = ['/destination', Object.entries(this.destination)[0][0]]
    //     console.log(this.navDestination,"on des, data null")
          
    //   } 
    //   else{
    //     console.log("else data exists")
    //     this.navDestination = ['/destination',Object.entries(this.destination)[0][0]];
    //   } 

    // } else{
    //   console.log("not on same page")
    //   this.navDestination = ['/destination'];
    // }
    

  }

  toggleNavModal(){
    const modal = document.getElementById('navModal')
    const backDrop = document.getElementById('backDrop')
    const hamburger = document.getElementById('hamburger')
    const closeButton = document.getElementById('closeButton')
    hamburger?.classList.toggle('displayNone');
    hamburger?.classList.toggle('displayBlock');
    closeButton?.classList.toggle('displayNone');
    closeButton?.classList.toggle('displayBlock');
    backDrop?.classList.toggle('displayNone');
    backDrop?.classList.toggle('displayFlex');
    modal?.classList.toggle('displayNone');
    modal?.classList.toggle('displayFlex');
  }
}
