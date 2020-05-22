import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
//import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})

export class UserDialogComponent implements OnInit {

  public userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<UserDialogComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
  //console.log(this.userForm,this.data[1])
    this.userForm = this._formBuilder.group({
      id: [this.data[0]],
      first_name: [ this.data[1]],
      last_name: [ this.data[2]],
      username: [ this.data[3]],
      email: [ this.data[4]],
      password: [ this.data[5]],
    });

  }

  onSubmit() {
                
                const uid = this.userForm.get("id").value
                this.userForm.patchValue({id:Number(uid)})
                //console.log(this.userForm.value,uid)
                if (isNaN(this.data)) {
                  this._api.updateUser(this.userForm.value).
                  subscribe((res)=>
                        console.log("User is Updated..")
                  );
                  this.dialogRef.close();
                } else {
                          this.dialogRef.close();
    }
  }

}


