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

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'userportal', component: UserportalComponent,canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'resource',  component: ResourceComponent,canActivate: [AuthGuard]},
  { path : 'group', component : GroupComponent,canActivate: [AuthGuard]},
  { path : 'user', component : RegisterUserComponent,canActivate: [AuthGuard]},
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