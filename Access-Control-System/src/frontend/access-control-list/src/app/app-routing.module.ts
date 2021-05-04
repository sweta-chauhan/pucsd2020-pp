import {NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserportalComponent} from './component/userportal/userportal.component';
import { LoginComponent } from './component/login/login.component';
import { AboutComponent } from './component/about/about.component';
import { MainComponent } from './component/main/main.component';
import { RegisterUserComponent } from './component/register-user/register-user.component';
import { PermissionResourseComponent } from './component/permission-resourse/permission-resourse.component';
import { GroupComponent } from './component/group/group.component';
import { MemberGroupComponent } from './component/member-group/member-group.component';
import { ResourceComponent } from './component/resource/resource.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminauthGuard } from './guards/adminauth.guard';


import { FileeditorComponent } from './component/fileeditor/fileeditor.component';
import { ViewerPortalComponent } from './component/viewer-portal/viewer-portal.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'userportal', component: UserportalComponent,canActivate: [AdminauthGuard] },
  { path: '', component: LoginComponent },
  { path : 'group', component : GroupComponent,canActivate: [AdminauthGuard]},
  { path : 'user', component : RegisterUserComponent,canActivate: [AdminauthGuard]},
  { path : 'viewerportal', component :ViewerPortalComponent, canActivate: [AuthGuard]}
  
  /*{ path : 'member', component : MemberGroupComponent,canActivate: [AuthGuard]},
  { path: 'resource',  component: ResourceComponent,canActivate: [AuthGuard]},
  { path : 'res',component :ResourceComponent,canActivate: [AuthGuard]},
  {path : 'file',component :FileeditorComponent}*/
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