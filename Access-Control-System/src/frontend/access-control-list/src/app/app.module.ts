import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminauthGuard } from './guards/adminauth.guard';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
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
import { HeaderComponent } from './component/header/header.component';
import { FileeditorComponent } from './component/fileeditor/fileeditor.component';
import { UserDialogComponent } from './component/user-dialog/user-dialog.component';
import { MemberDialrerComponent } from './component/member-dialrer/member-dialrer.component';
import { FileEditorComponent } from './component/file-editor/file-editor.component';
import { GroupDialogComponent } from './component/group-dialog/group-dialog.component';
import { PermissionGroupDialogComponent } from './component/permission-group-dialog/permission-group-dialog.component';
import { PermissionUserDialogComponent } from './component/permission-user-dialog/permission-user-dialog.component';
import { ViewerPortalComponent } from './component/viewer-portal/viewer-portal.component';
import { FileReaderComponent } from './component/file-reader/file-reader.component';

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
    HeaderComponent,
    FileeditorComponent,
    UserDialogComponent,
    MemberDialrerComponent,
    FileEditorComponent,
    GroupDialogComponent,
    PermissionGroupDialogComponent,
    PermissionUserDialogComponent,
    ViewerPortalComponent,
    FileReaderComponent,
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
   MatTabsModule,
   ReactiveFormsModule

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
   AuthGuard,
   AdminauthGuard,   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
