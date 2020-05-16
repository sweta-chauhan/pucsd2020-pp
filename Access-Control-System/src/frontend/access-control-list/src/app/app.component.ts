import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resourcetype } from './models/resourcetype';

import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'access-control-list';
  constructor(private _api: ApiService) { }
  group;
  ngOnInit(): void {

	}
    
}
