import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-member-group',
  templateUrl: './member-group.component.html',
  styleUrls: ['./member-group.component.css']
})
export class MemberGroupComponent implements OnInit {
	
  groupid:number;
  userid:number;	
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
  }
  addmembergroup(){
      this._api.addUserGroup({"id":Number(this.groupid),"user_id":Number(this.userid)}).subscribe(res => {})
      this.groupid=null
      this.userid=null
  }
  cancel(){
  	this.groupid=null
  	this.userid=null
  }
}
