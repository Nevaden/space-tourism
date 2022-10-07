import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewComponent } from './components/pages/crew/crew.component';
import { DestinationComponent } from './components/pages/destination/destination.component';
import { PlanetComponent } from './components/pages/destination/planet/planet.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TechnologyComponent } from './components/pages/technology/technology.component';
import { ResolverService } from './Services/resolver.service';

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'destination', component: DestinationComponent, children: [
    {path: ':id', component: PlanetComponent, resolve: {Planet: ResolverService}},
  ]},
  {path: 'crew', component: CrewComponent, children: [
    {path: ':id', component: CrewComponent},
  ]},
  {path: 'technology', component: TechnologyComponent, children: [
    {path: ':id', component: TechnologyComponent},
  ]},
  {path: '*', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
