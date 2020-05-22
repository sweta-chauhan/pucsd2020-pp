import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Groupaccess } from '../models/groupaccess';
import { Groupuser } from '../models/groupuser';
import { Permission } from '../models/permission';
import { Resource } from '../models/resource';
import { Useraccess } from '../models/useraccess';
import { Resourcetype }	from '../models/resourcetype';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

    public createUser(user: User) {
      return this.http.post('/webapi/v1/user', user);
    } 

  public updateUser(user) {
    return this.http.put('/webapi/v1/user/'+user.id, user);
  }

  public deleteUser(id: number) {
    return this.http.delete('/webapi/v1/user/'+id);
  }

  public getUserById(id: number) {
    return this.http.get('/webapi/v1/user/'+id);
  }

  public getUser() {
    return this.http.get('/webapi/v1/user');
  }

  public createGroup(group: Group) {
    return this.http.post('/webapi/v1/group', group);

  }

  public updateGroup(group: Group) {
    return this.http.put('/webapi/v1/group/'+group.id, group);
  }

  public deleteGroup(id: number) {
    return this.http.delete('/webapi/v1/group/'+id);
  }

  public getGroupById(id: number) {
    return this.http.get('/webapi/v1/group/'+id);
  }

  public getGroup() {
    return this.http.get('/webapi/v1/group');
  }

  public addUserGroup(newusergroup: Groupuser) {
    return this.http.post('/webapi/v1/groupuser', newusergroup);
  }

  public updateUserGroup(group: Groupuser) {
    return this.http.put('/webapi/v1/groupuser/'+group.id, group);
  }

  /*API to get users' membership in a group*/
  public getMembershipUser(id){
    return this.http.get('/webapi/v1/groups/'+id);
  }  

  public deleteUserGroup(id: number) {
    return this.http.delete('/webapi/v1/groupuser/'+id);
  }

  public getUserGroupById(id: number) {
    return this.http.get('/webapi/v1/groupuser/'+id);
  }

  public getUserGroup() {
    return this.http.get('/webapi/v1/groupuser');
  }


  public createUserpermission(data: Useraccess) {
    return this.http.post('/webapi/v1/useraccess', data);
  }

  public updateUserpermission(data: Useraccess) {
    return this.http.put('/webapi/v1/useraccess'+data.resource_id, data);
  }

  public deleteUserpermission(id: number) {
    return this.http.delete('/webapi/v1/useraccess'+id);
  }

  public getUserpermissionById(id: number) {
    return this.http.get('/webapi/v1/useraccess/'+id);
  }

  public getUserpermission() {
    return this.http.get('/webapi/v1/useraccess');
  }



  // services for grouppermission

  public createGroupPermission(data: Groupaccess) {
    return this.http.post('/webapi/v1/groupaccess', data);
  }

  public updateGrouppermission(data: Groupaccess) {
    return this.http.put('/webapi/v1/grouppermission/'+data.group_id, data);
  }

  public deleteGrouppermission(id: number) {
    return this.http.delete('/webapi/v1/grouppermission/'+id);
  }

  public getGrouppermissionById(id: number) {
    return this.http.get('/webapi/v1/grouppermission/'+id);   //endpoint
  }

  public getGrouppermission() {
    return this.http.get('/webapi/v1/groupaccess');
  }

  public createResource(data: Resource) {
    return this.http.post('/webapi/v1/resource', data);
  }

  public updateResource(data: Resource) {
    return this.http.put('/webapi/v1/resource/'+data.id, data);
  }

  public deleteResource(id: number) {
    return this.http.delete('/webapi/v1/resource/'+id);
  }

  public getResourceById(id: number) {
    return this.http.get('/webapi/v1/resource/'+id);
  }

  public getResource() {
    return this.http.get('/webapi/v1/resource');
  }

}
