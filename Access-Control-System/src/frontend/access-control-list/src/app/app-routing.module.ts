import {NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserportalComponent} from './component/userportal/userportal.component';
import { LoginComponent } from './component/login/login.component';
import { AboutComponent } from './component/about/about.component';
import { MainComponent } from './component/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'userportal', component: UserportalComponent },
  { path: 'login', component: LoginComponent },
  { path : 'about', component : AboutComponent},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    
  ]
})
export class AppRoutingModule { }