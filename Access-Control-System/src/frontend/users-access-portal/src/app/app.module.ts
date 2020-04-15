import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { NavigatorComponent } from './components/navigator/navigator.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
/*for Form*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AddComponent } from './components/User/add/add.component';
import { DeleteComponent } from './components/User/delete/delete.component';
import { UpdateComponent } from './components/User/update/update.component';
import { SearchComponent } from './components/User/search/search.component'
import { HomeComponent } from './components/home/home.component';
import { DisplayComponent } from './components/User/display/display.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    AddComponent,
    DeleteComponent,
    UpdateComponent,
    SearchComponent,
    DisplayComponent
    ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	RouterModule,
    HttpClientModule,
	AppRoutingModule,
	LayoutModule,
	MatToolbarModule,
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatListModule,
	BrowserAnimationsModule,
	MatGridListModule,
	MatCardModule,
	MatMenuModule,
  MatFormFieldModule,
  FormsModule, 
  ReactiveFormsModule
  ],
  providers: [
  ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
