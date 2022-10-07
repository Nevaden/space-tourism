import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DestinationComponent } from './components/pages/destination/destination.component'; 
import { CrewComponent } from './components/pages/crew/crew.component'; 
import { TechnologyComponent } from './components/pages/technology/technology.component';
import { NavComponent } from './components/shared/nav/nav.component'; 
import { DataService } from './Services/data.service';
import { PlanetComponent } from './components/pages/destination/planet/planet.component';
import { ResolverService } from './Services/resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationComponent,
    CrewComponent,
    TechnologyComponent,
    NavComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataService, ResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
