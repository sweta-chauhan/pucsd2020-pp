import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-permission-resourse',
  templateUrl: './permission-resourse.component.html',
  styleUrls: ['./permission-resourse.component.css']
})
export class PermissionResourseComponent implements OnInit {
   userid:number;
   groupid:number;
   access:number;
  constructor() { }

  ngOnInit(): void {
  }

}
