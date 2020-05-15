import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

 
  user;
  constructor(private _api: ApiService){
	}


  ngOnInit(): void {
  	
		this._api.getById(1)
		.subscribe((res) => 
				{
					//console.log(res);
					this.user = res.data;
					//console.log(this.user);
				});
  }
onClick(id?:number) {
    console.log(id)
    this._api.getById(id)
    }
}
