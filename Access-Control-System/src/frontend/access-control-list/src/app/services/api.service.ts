import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Groupaccess } from '../models/groupaccess';
import { Groupuser } from '../models/groupuser';
import { Permission } from '../models/permission';
import { Resource } from '../models/resource';
import { Useraccess } from '../models/useraccess';
import { Resourcetype }	from '../models/resourcetype';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
})
};

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private httpclient: HttpClient) { }
	 
	  
  private BASE_URL = "http://localhost:9090/webapi/v1"  
  /*Create User Object*/
  
  createUser(body:any|null):Observable<User>{
   return this.httpclient.post<User>(this.BASE_URL,body);
    }

  /*Get Object by id*/
  getUserById(id: number):Observable<User>{
	 return this.httpclient.get<User>(this.BASE_URL+"/user/"+id);
	  }

  /*Get All object */
   getAllUser(): Observable<any> {
  	return this.httpclient.get<any>(this.BASE_URL+"/user");
  }

 /*Delete User by id*/
   DelByUserId(id: number,body:null):Observable<User>{
   return this.httpclient.post<User>(this.BASE_URL+"/user/"+id,body);
    }
 /*Update User by id*/
  UpdateUserById(id: number,body: any):Observable<User>{
   return this.httpclient.put<User>(this.BASE_URL+"/user/"+id,body);
    } 

    /*Create Group Object*/
  createGroup(body:any|null):Observable<Group>{
   return this.httpclient.post<Group>(this.BASE_URL+"/group",body);
    }

  /*Get Object by id*/
    getGroupById(id: number):Observable<any>{
	 return this.httpclient.get<Group>(this.BASE_URL+"/group/"+id);
	  }

  /*Get All object */
   getAllGroup(): Observable<Group[]> {
  	return this.httpclient.get<any>(this.BASE_URL+"/group");
  }

 /*Delete Group by id*/
   DelByGroupId(id: number,body:null):Observable<Group>{
   return this.httpclient.post<Group>(this.BASE_URL+"/group/"+id,body);
    }
 /*Update Group by id*/
  UpdateGroupById(id: number,body: any):Observable<Group>{
   return this.httpclient.put<Group>(this.BASE_URL+"/group/"+id,body);
    }

    /*Create Resourcetype Object*/
  createResourceType(body:any|null):Observable<Resourcetype>{
   return this.httpclient.post<Resourcetype>(this.BASE_URL+"/rtype",body);
    }

  /*Get Object by id*/
    getResourcetypeById(id: number):Observable<Resourcetype>{
	 return this.httpclient.get<Resourcetype>(this.BASE_URL+"/rtype/"+id);
	  }

  /*Get All object */
   getAllResourcetype(): Observable<Resourcetype[]> {
  	return this.httpclient.get<Resourcetype[]>(this.BASE_URL+"/rtype");
  }

 /*Delete Resourcetype by id*/
   DelByResourcetypeId(id: number,body:null):Observable<Resourcetype>{
   return this.httpclient.post<Resourcetype>(this.BASE_URL+"/rtype/"+id,body);
    }
 /*Update Resourcetype by id*/
  UpdateResourcetypeById(id: number,body: any):Observable<Resourcetype>{
   return this.httpclient.put<Resourcetype>(this.BASE_URL+"/rtype/"+id,body);
    }

/*Create Resource Object*/
  createResource(body:any|null):Observable<Resource>{
   return this.httpclient.post<Resource>(this.BASE_URL,body);
    }

  /*Get Object by id*/
    getResourceById(id: number):Observable<Resource>{
	 return this.httpclient.get<Resource>(this.BASE_URL+"/resource/"+id);
	  }

  /*Get All object */
   getAllResource(): Observable<any> {
  	return this.httpclient.get<any>(this.BASE_URL+"/resource");
  }

 /*Delete Resource by id*/
   DelByResourceId(id: number,body:null):Observable<Resource>{
   return this.httpclient.post<Resource>(this.BASE_URL+"/resource/"+id,body);
    }
 /*Update Resource by id*/
  UpdateResourceById(id: number,body: any):Observable<Resource>{
   return this.httpclient.put<Resource>(this.BASE_URL+"/resource/"+id,body);
    }

   /*Create Permission Object*/
  createPermission(body:any|null):Observable<Permission>{
   return this.httpclient.post<Permission>(this.BASE_URL,body);
    }

  /*Get Object by id*/
    getPermissionById(id: number):Observable<Permission>{
	 return this.httpclient.get<Permission>(this.BASE_URL+"/permission/"+id);
	  }

  /*Get All object */
   getAllPermission(): Observable<any> {
  	return this.httpclient.get<any>(this.BASE_URL+"/permission");
  }

 /*Delete Permission by id*/
   DelByPermissionId(id: number,body:null):Observable<Permission>{
   return this.httpclient.post<Permission>(this.BASE_URL+"/permission/"+id,body);
    }
 /*Update Permission by id*/
  UpdatePermissionById(id: number,body: any):Observable<Permission>{
   return this.httpclient.put<Permission>(this.BASE_URL+"/permission/"+id,body);
    }

   /*Create Groupaccess Object*/
  createGroupaccess(body:any|null):Observable<Groupaccess>{
   return this.httpclient.post<Groupaccess>(this.BASE_URL,body);
    }

  /*Get Object by id*/
    getGroupaccessById(id: number):Observable<Groupaccess>{
	 return this.httpclient.get<Groupaccess>(this.BASE_URL+"/groupaccess/"+id);
	  }

  /*Get All object */
   getAllGroupaccess(): Observable<any> {
  	return this.httpclient.get<any>(this.BASE_URL+"/groupaccess");
  }

 /*Delete Groupaccess by id*/
   DelByGroupaccessId(id: number,body:null):Observable<Groupaccess>{
   return this.httpclient.post<Groupaccess>(this.BASE_URL+"/groupaccess/"+id,body);
    }
 /*Update Groupaccess by id*/
  UpdateGroupaccessById(id: number,body: any):Observable<Groupaccess>{
   return this.httpclient.put<Groupaccess>(this.BASE_URL+"/groupaccess/"+id,body);
    }

   /*Create Useraccess Object*/
  createUseraccess(body:any|null):Observable<Useraccess>{
   return this.httpclient.post<Useraccess>(this.BASE_URL,body);
    }

  /*Get Object by id*/
    getUseraccessById(id: number):Observable<Useraccess>{
	 return this.httpclient.get<Useraccess>(this.BASE_URL+"/useraccess/"+id);
	  }

  /*Get All object */
   getAllUseraccess(): Observable<any> {
  	return this.httpclient.get<any>(this.BASE_URL+"/useraccess");
  }

 /*Delete Useraccess by id*/
   DelByUseraccessId(id: number,body:null):Observable<Useraccess>{
   return this.httpclient.post<Useraccess>(this.BASE_URL+"/useraccess/"+id,body);
    }
 /*Update Useraccess by id*/
  UpdateUseraccessById(id: number,body: any):Observable<Useraccess>{
   return this.httpclient.put<Useraccess>(this.BASE_URL+"/useraccess/"+id,body);
    }

    /*Create Groupuser Object*/
  createGroupuser(body:any|null):Observable<Groupuser>{
   return this.httpclient.post<Groupuser>(this.BASE_URL,body);
    }

  /*Get Object by id*/
    getGroupuserById(id: number):Observable<Groupuser>{
	 return this.httpclient.get<Groupuser>(this.BASE_URL+"/groupuser/"+id);
	  }

  /*Get All object */
   getAllGroupuser(): Observable<any> {
  	return this.httpclient.get<any>(this.BASE_URL+"/groupuser");
  }

 /*Delete Groupuser by id*/
   DelByGroupuserId(id: number,body:null):Observable<Groupuser>{
   return this.httpclient.post<Groupuser>(this.BASE_URL+"/groupuser/"+id,body);
    }
 /*Update Groupuser by id*/
  UpdateGroupuserById(id: number,body: any):Observable<Groupuser>{
   return this.httpclient.put<Groupuser>(this.BASE_URL+"/groupuser/"+id,body);
    }
  GetUserGroupById(id: number):Observable<any>{
   return this.httpclient.get<Groupuser>(this.BASE_URL+"/groups/"+id);
    }
}
