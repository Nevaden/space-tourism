import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewComponent } from './components/pages/crew/crew.component';
import { PersonnelComponent } from './components/pages/crew/personnel/personnel.component';
import { DestinationComponent } from './components/pages/destination/destination.component';
import { PlanetComponent } from './components/pages/destination/planet/planet.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TechComponent } from './components/pages/technology/tech/tech.component';
import { TechnologyComponent } from './components/pages/technology/technology.component';
import { ResolverService } from './Services/resolver.service';

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'destination', component: DestinationComponent, children: [
    {path: ':id', component: PlanetComponent, resolve: {Planet: ResolverService}},
    // {path: '', redirectTo: "Moon", pathMatch: "full"}
  ]},
  {path: 'crew', component: CrewComponent, children: [
    {path: ':id', component: PersonnelComponent, resolve: {Person: ResolverService}},
    // {path: '', redirectTo: "Douglas Hurley", pathMatch: "full"}
  ]},
  {path: 'technology', component: TechnologyComponent, children: [
    {path: ':id', component: TechComponent, resolve: {Tech: ResolverService}},
    // {path: '', redirectTo: "Launch vehicle", pathMatch: "full"}
  ]},
  {path: '*', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
