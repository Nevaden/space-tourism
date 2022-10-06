import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
