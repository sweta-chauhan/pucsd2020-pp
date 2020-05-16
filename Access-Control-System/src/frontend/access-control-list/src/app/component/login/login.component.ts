
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private _api: ApiService) { }
  username: number;
  password: string;
  user;
  ngOnInit() {
  }
  login() : void {
    this._api.getUserById(this.username)
    .subscribe((res) => 
        {
          this.user = res['data'];
        });
    if(this.username == this.user['id'] && this.password == this.user.password){
            
     this.router.navigate(["userportal"]);
    }else {
      alert("Invalid credentials");
    }
  }

  cancel() : void {
    this.username=null;
    this.password="";
  }
}
