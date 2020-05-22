import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-permission-user-dialog',
  templateUrl: './permission-user-dialog.component.html',
  styleUrls: ['./permission-user-dialog.component.css']
})
export class PermissionUserDialogComponent implements OnInit {
	
  public userpermissionForm: FormGroup;
  user_id = [];
  permission = ["Read","Write"];	
  
  onNoClick(): void {
    this.dialogRef.close();
   }
  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<PermissionUserDialogComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data: any) { 
  }


  ngOnInit(): void {
      //console.log("Hello",this.data.ID);
      this.user_id= this.data.user_id;
      this.userpermissionForm = this._formBuilder.group({resource_id:this.data.resource_id,user_id:[this.data.user_id],permission:this.data.permission});
      console.log(this.userpermissionForm.value);
  }


  onSubmit(){ 
                let permission;
                if (this.userpermissionForm.value.permission=== "Read")
                {
                    permission = 1;
                }
                else{
                    permission = 2;
                }
                //console.log(permission);
                //console.log(resource_id);
                const res_id = Number(this.userpermissionForm.value.resource_id);
                const uid = Number(this.userpermissionForm.value.user_id);

                if (isNaN(this.data)) {
                  this._api.createUserpermission({"resource_id":res_id,"user_id":uid,"permission":permission}).subscribe(res=>{
                      console.log(res['data']);
                  });
                  this.dialogRef.close();
                } 
                else {
                      this.dialogRef.close();
                  }

  }
}


  /*this._api.createUserpermission({"resource_id":,"id":,"pid":}).subscribe(res=>{});
  console.log("Here groupaccessentry call is to be made..")
  */