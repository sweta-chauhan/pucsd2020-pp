
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }
  username: number;
  password: string;
  ngOnInit() {
  }
  login() : void {
    if(this.username == 1 && this.password == 'admin'){
     this.router.navigate(["user"]);
    }else {
      alert("Invalid credentials");
    }
  }

  cancel() : void {
    this.username=null;
    this.password="";
  }
}
