import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {MatDialogModule} from '@angular/material/dialog';
import { RegisterUserComponent } from '../register-user/register-user.component';

import { GroupComponent } from '../group/group.component';
import { Router } from '@angular/router';
import { ResourceComponent } from '../resource/resource.component';

@Component({
  selector: 'app-userportal',
  templateUrl: './userportal.component.html',
  styleUrls: ['./userportal.component.css']
})
export class UserportalComponent implements OnInit {
   allUsers;
   username = localStorage.getItem('username')
  constructor( private _api: ApiService,private router:Router) { 
  		this.getAllUser();
  }

  ngOnInit(): void {
    this.getAllUser();	
  }
  getAllUser(){
  	this._api.getAllUser()
    .subscribe((res) => 
        {
        	this.allUsers = res['data'];
        });
  }

  /*
  user(){
      this.router.navigate(['/user'])
  }
  group(){
      this.router.navigate(['/group'])   
  }
  resource(){
      this.router.navigate(['/resource'])
  }
  */
}
