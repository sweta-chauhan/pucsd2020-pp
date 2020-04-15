import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';


@Injectable({  
	  providedIn: 'root'  
})
export class ApiService {

  private BASE_URL = "http://localhost:9090/webapi/v1/user"

  constructor(private httpclient: HttpClient) { }
  
  /*Create Object*/
  createObject(body:any|null):Observable<any>{
   return this.httpclient.post(this.BASE_URL,body);
    }

  /*Get Object by id*/
  getById(id: number):Observable<any>{
	 return this.httpclient.get(this.BASE_URL+"/"+id);
	  }
  
  /*Get All object */
  getAll(): Observable<any> {
  	return this.httpclient.get(this.BASE_URL);
  }
 
 /*Delete User by id*/
 DelById(id: number,body:any|null):Observable<any>{
   return this.httpclient.post(this.BASE_URL+"/"+id,body);
    }
 /*Update User by id*/
  UpdateById(id: number,body: any|null):Observable<any>{
   return this.httpclient.put(this.BASE_URL+"/"+id,body);
    }
}
