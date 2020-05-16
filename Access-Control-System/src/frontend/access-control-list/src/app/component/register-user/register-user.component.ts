import { Component, OnInit } from '@angular/core';
																																																																																																																																																																																																							
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
	
  firstname:string;
  lastname:string;
  username:string;
  email:string;
  password:string;
  is_sudo:number;
  constructor() { }

  ngOnInit(): void {
  }
  cancel(){
    this.firstname="";
    this.lastname="";
    this.username="";
    this.email="";
    this.password="";
    this.is_sudo=0;
  }

  create(){}
  update(){}
}
