import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatRadioChange } from '@angular/material/radio';
import {Router} from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
	
  public userForm: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
   }
  constructor(
  private router: Router,
  private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<RegisterUserComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  this.userForm = this._formBuilder.group({
      id: [this.data.id],
      first_name: [ this.data.first_name],
      last_name: [ this.data.Last_name],
      username: [ this.data.username],
      email: [ this.data.email],
      password:[this.data.password],
      is_sudo:0,
      }
  );
  }

/*
  cancel(){
  this.firstname="";
    this.lastname="";
    this.username="";
    this.email="";
    this.password="";
    this.is_sudo=0;
}*/
  
onSubmit(){
  const id = Number(this.userForm.get("id").value);
  const fname = this.userForm.get("first_name").value;
  const lname = this.userForm.get("last_name").value;
  const uname = this.userForm.get("username").value;
  const email = this.userForm.get("email").value;
  const pass = this.userForm.get("password").value;
  console.log("User Form Sumitted..")
        this._api.createUser({"id":0,"first_name":fname,"last_name":lname,"username":uname,"email":email,"password":pass,"is_sudo":0}).subscribe(res => {
          console.log(res['data']);
        });
      this.dialogRef.close();
  }  

  /*create(){

  this._api.createUser({"id":0,"first_name":this.firstname,"last_name":this.lastname,"username":this.username,"email":this.email,"password":this.password,"is_sudo":0}).subscribe(res => {});
  //this.router.navigate(["userportal"]);
  }*/


}
