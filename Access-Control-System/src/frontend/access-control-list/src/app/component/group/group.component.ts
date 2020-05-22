import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public groupForm: FormGroup;
  /*groupname:string;
  groupid:number;*/
  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<GroupComponent>,
  private _api: ApiService,
  private r: Router,
  @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit(): void {
    this.groupForm = this._formBuilder.group({
    id:[this.data.id],
    gname:[this.data.gname],
    });
  }

onSubmit() {
        const id = Number(this.groupForm.get("id").value);
        const name = this.groupForm.get("gname").value;
        this._api.createGroup({"id":id,"gname":name}).subscribe(res => {})
        this.dialogRef.close();
  }

  /*
  creategroup(){
      this._api.createGroup({"id":Number(this.groupid),"gname":this.groupname}).subscribe(res => {})
      //this.groupname=""
      //this.groupid=null
      this.r.navigate(["userportal"]);
  }
  cancel(){
  	this.groupname=""
    this.groupid=null 
  }*/


}
