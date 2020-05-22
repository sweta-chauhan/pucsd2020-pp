import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-permission-group-dialog',
  templateUrl: './permission-group-dialog.component.html',
  styleUrls: ['./permission-group-dialog.component.css']
})
export class PermissionGroupDialogComponent implements OnInit {

  public grouppermissionForm: FormGroup;
  group_id = [];
  permission = ["Read","Write"];
  onNoClick(): void {
    this.dialogRef.close();
   }
  

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<PermissionGroupDialogComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  this.group_id = this.data.group_id;
  //console.log(this.data)
      this.grouppermissionForm = this._formBuilder.group({resource_id:this.data.resource_id,group_id:[this.data.group_id],permission:this.data.permission});
      console.log(this.grouppermissionForm.value);
  }

  onSubmit(){
  //API Call for Creating Permission
  let permission;
                if (this.grouppermissionForm.value.permission=== "Read")
                {
                    permission = 1;
                }
                else{
                    permission = 2;
                }
                const res_id = Number(this.grouppermissionForm.value.resource_id);
                const uid = Number(this.grouppermissionForm.value.group_id);
                if (isNaN(this.data)) {
                  this._api.createGroupPermission({"resource_id":res_id,"group_id":uid,"permission":permission}).subscribe(res=>{
                      console.log(res['data']);
                  });
                  this.dialogRef.close();
                } 
                else {
                      this.dialogRef.close();
                  }


  //this._api.createGroupPermission
  //console.log("Here groupaccessentry call is to be made..")
  }
}
