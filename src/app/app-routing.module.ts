import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewComponent } from './components/pages/crew/crew.component';
import { DestinationComponent } from './components/pages/destination/destination.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TechnologyComponent } from './components/pages/technology/technology.component';

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'destination', component: DestinationComponent},
  {path: 'crew', component: CrewComponent},
  {path: 'technology', component: TechnologyComponent},
  {path: '*', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
