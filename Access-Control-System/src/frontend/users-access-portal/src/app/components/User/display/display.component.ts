import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  users;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
  	this._api.getAll()
		.subscribe((res) => 
				{
					console.log(res);
					this.users = res.data;
					console.log(this.users);
				});
	}
   onClick() {
    	this._api.getAll()
	}
}
