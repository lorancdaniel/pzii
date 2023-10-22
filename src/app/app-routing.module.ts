import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogowanieComponent } from "./logowanie/logowanie.component"
import { NavComponent } from "./nav/nav.component"
import { MainComponent } from './main/main.component';

const routes: Routes = [
    {path: "logowanie", component: LogowanieComponent},
    {path: "nav", component: NavComponent},
    {path: "main", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
