import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DestinationComponent } from './components/pages/destination/destination.component'; 
import { CrewComponent } from './components/pages/crew/crew.component'; 
import { TechnologyComponent } from './components/pages/technology/technology.component';
import { NavComponent } from './components/shared/nav/nav.component'; 
import { DataService } from './Services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationComponent,
    CrewComponent,
    TechnologyComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
