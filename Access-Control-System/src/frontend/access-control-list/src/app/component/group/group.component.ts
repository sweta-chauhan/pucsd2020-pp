import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groupname:string;
  group;
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
  }
  creategroup(){
  		this._api.createGroup({'gname':this.groupname})
    .subscribe((res) => 
        {
        	this.group = res['data'];
        });
  }
  cancel(){
  	this.groupname=""
  }
}
