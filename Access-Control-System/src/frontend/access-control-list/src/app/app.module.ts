import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";

import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';


import { HttpClientModule, HttpClient } from '@angular/common/http';


import { LoginComponent } from './component/login/login.component';
import { UserportalComponent } from './component/userportal/userportal.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutComponent } from './component/about/about.component';
import { MainComponent } from './component/main/main.component';
import { ApiService } from './services/api.service';
import { RegisterUserComponent } from './component/register-user/register-user.component';
import { PermissionResourseComponent } from './component/permission-resourse/permission-resourse.component';
import { GroupComponent } from './component/group/group.component';
import { MemberGroupComponent } from './component/member-group/member-group.component';
import { ResourceComponent } from './component/resource/resource.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserportalComponent,
    FooterComponent,
    AboutComponent,
    MainComponent,
    RegisterUserComponent,
    PermissionResourseComponent,
    GroupComponent,
    MemberGroupComponent,
    ResourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatRadioModule,
   MatTabsModule
  ],
  providers: [
    MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
