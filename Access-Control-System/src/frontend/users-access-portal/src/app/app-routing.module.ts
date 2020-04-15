import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/User/add/add.component';
import { DeleteComponent } from './components/User/delete/delete.component';
import { UpdateComponent } from './components/User/update/update.component';
import { SearchComponent } from './components/User/search/search.component';
import { DisplayComponent } from './components/User/display/display.component';




const routes: Routes = [
{path: 'home',component:HomeComponent},
{path: 'add/user',component:AddComponent},
{path: 'edit/user/:id',component:UpdateComponent},
{path: 'delete/user/:id',component:DeleteComponent },
{path: 'search/user/:id',component:SearchComponent},
{path: 'display/user',component:DisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
