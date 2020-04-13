import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient: HttpClient) { }

  getuserbyid(): Observable<any> {
  	return this.httpclient.get("http://localhost:9090/webapi/v1/user/1")
  }
}
