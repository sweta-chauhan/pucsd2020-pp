import { Component } from '@angular/core';
//import { ApiService } from './services/api.service';
//import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'users-access-portal';
  constructor(){
	  }
/*
  ngOnInit(){
		this._api.getAll()
		.subscribe((res) => 
				{
					console.log(res);
					this.users = res.data;
					console.log(this.users);
				});
		this._api.getUserById(1)
		.subscribe((res) => 
				{
					console.log(res);
					this.user = res.data;
					console.log(this.user);
				});
		//this._api.updateUserById()
				  			}  
*/
  }
