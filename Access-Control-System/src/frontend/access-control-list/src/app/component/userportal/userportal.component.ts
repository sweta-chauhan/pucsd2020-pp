import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import {MemberDialrerComponent} from '../member-dialrer/member-dialrer.component';
import {GroupDialogComponent} from '../group-dialog/group-dialog.component';
import {FileeditorComponent} from '../fileeditor/fileeditor.component';
import {GroupComponent} from '../group/group.component';
import { Router } from '@angular/router';
import { ResourceComponent } from '../resource/resource.component';
import { FileEditorComponent } from '../file-editor/file-editor.component';

import { PermissionUserDialogComponent } from '../permission-user-dialog/permission-user-dialog.component'; 
import { PermissionGroupDialogComponent } from '../permission-group-dialog/permission-group-dialog.component';


import{ GlobalConstants } from '../../common/global-constant';



@Component({
  selector: 'app-userportal',
  templateUrl: './userportal.component.html',
  styleUrls: ['./userportal.component.css']
})
export class UserportalComponent implements OnInit {
   allUsers;
   allResources;
   allGroups;
   allGroupAccess;
   allUserAccess;
   allGroupUser;
   //isOpenDialog = false;
   users_id = [];
   resource_id = [];
   group_id = [];
   
   username = localStorage.getItem('username')
   //user:any=[];
  constructor(private api: ApiService,private router:Router,private dialog?: MatDialog) { 
  }

  ngOnInit(): void {
    this.data();
    console.log(GlobalConstants.isDialogOpen)
    //console.log(this.allUsers);
    //this.getGroup_id(this.allGroup);
    //this.getUser_id(this.allUsers);
    //this.getResource_id(this.allResources);
  }
  async data(){
    await this.api.getUser()
    .subscribe((res) => 
        {
          this.allUsers = res['data'];
        });
    await this.api.getGroup()
    .subscribe((res) => 
        {
          this.allGroups = res['data'];
        });
    await this.api.getGrouppermission()
    .subscribe((res) => 
        {
          this.allGroupAccess = res['data'];
        });

    await this.api.getUserpermission()
    .subscribe((res) => 
        {
          this.allUserAccess = res['data'];
        });

    await this.api.getUserGroup()
    .subscribe((res) => 
        {
          this.allGroupUser = res['data'];
        });
    await this.api.getResource()
    .subscribe((res)=>{
          this.allResources = res['data'];
        });
  }

/*Helper functions*/

getUser_id(users){
    this.users_id = [];
    for (let user in users)
    {
      this.users_id.push(users[user][0]);
    }
  }
getGroup_id(groups){
  this.group_id = [];
  for (let grp in groups)
    {
      this.group_id.push(groups[grp][0]);
    }
}
getResource_id(resource){
  this.resource_id = [];
  for (let res in resource)
    {
      this.resource_id.push(resource[res][0]);
    }
}
/*
addMember(group_id){
  let groupUser = []
  for (let group in this.allGroupUser)
  {
        if (group_id === this.allGroupUser[group][0]
           ){
            groupUser.push(this.allGroupUser[group]);
        }
  }
  this.allGroupUser = groupUser;
}
*/

updateMember(group_id){
  let groupUser = []
  for (let group in this.allGroupUser)
  {
        if (group_id != this.allGroupUser[group][0]){
            groupUser.push(this.allGroupUser[group]);
        }
  }
  this.allGroupUser = groupUser;
}

/*Manipulating Data structure and data base with dialect*/
  
  async editUser(id){
      const usr = this.allUsers.find(u => u[0] === id );
      const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: usr
      });
      await dialogRef.afterClosed().subscribe(result =>   {
          this.api.getUserById(Number(usr[0]))
          .subscribe((res) =>{
          const index = this.allUsers.findIndex(u => u[0] === id );
              this.allUsers[index]=          [(res['data'].id).toString(),
              res['data'].first_name,
              res['data'].last_name,
              res['data'].username,
              res['data'].email,
              res['data'].password,
              res['data'].is_sudo];  
    });
    });
  }

    
async addUser(){
      //const usr = this.allUsers.find(u => u[0] === id );
      const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '250px',
      data: {}
      });
      await dialogRef.afterClosed().subscribe(result =>   {
          /*this.api.getUserById(Number(usr[0]))
          .subscribe((res) =>{
          const index = this.allUsers.findIndex(u => u[0] === id );
              this.allUsers[index]=          [(res['data'].id).toString(),
              res['data'].first_name,
              res['data'].last_name,
              res['data'].username,
              res['data'].email,
              res['data'].password,
              res['data'].is_sudo];  
    });*/
    this.api.getUser()
    .subscribe((res) => 
        {
          this.allUsers = res['data'];
        });
    });
  }


async addGroup(){
      const dialogRef = this.dialog.open(GroupComponent, {
      width: '250px',
      data: {}
      });
      await dialogRef.afterClosed().subscribe(result =>   {
              this.api.getGroup()
              .subscribe((res) => 
              {
                this.allGroups = res['data'];
              });
      });
  }


async deleteuser(id){
    if (id === '1'){
      alert("No one can delete Admin...")
    }
    else{
      await this.api.deleteUser(Number(id))
        .subscribe((res) =>{
        console.log("User Get Deleted...");
      });
      const index = this.allUsers.findIndex(u => u[0]   === id );
      this.allUsers.splice(index,1);
    }
  }

/*Group Operations*/
addMembers(id){
  this.getUser_id(this.allUsers);
  const grp = this.allGroups.find(g => g[0] === id );
  const dialogRef = this.dialog.open(MemberDialrerComponent, {
                           width: '450px',
                           data: {id:grp[0],user_id:this.users_id}
  });
  dialogRef.afterClosed().subscribe(result => {
          //console.log("Member Get Added...");
          this.api.getUserGroup()
          .subscribe((res) => 
          {
            this.allGroupUser = res['data'];
            console.log(res['data']);
          });

  });
}


userpermission(id){
  this.getUser_id(this.allUsers);
  const res = this.allResources.find(r => r[0] === id );
  const dialogRef = this.dialog.open(PermissionUserDialogComponent, {
                           width: '450px',
                           data: {resource_id:res[0],user_id:this.users_id,permission:"Read"}
  });
  dialogRef.afterClosed().subscribe(result =>   {
        console.log("Access given to the user")
  });

}

grouppermission(id){
  this.getGroup_id(this.allGroups);
  const res = this.allResources.find(r => r[0] === id );
  
  const dialogRef = this.dialog.open(PermissionGroupDialogComponent, {
                           width: '450px',
                           data: {resource_id:res[0],group_id:this.group_id,permission:"Read"}
  });
  dialogRef.afterClosed().subscribe(result =>   {
        console.log("Access give to the user")
  });
}


/*Group Operations*/

editgroup(id){
      const grp = this.allGroups.find(g => g[0] === id );
      const dialogRef = this.dialog.open(GroupDialogComponent, {
      width: '250px',
      data: grp
      });
    dialogRef.afterClosed().subscribe(result => {
        this.api.getGroupById(Number(grp[0]))
        .subscribe((res) =>{
            const index = this.allUsers.findIndex(u => u[0] === id );
            console.log(res['data']);
            this.allGroups[index]=[(res['data'].id).toString(),
              res['data'].gname];  
          });
    
    });
}


deletegroup(id){
    if (id === '1'){
      alert("No one can delete Admin...")
    }
    else{
      this.api.deleteGroup(Number(id))
        .subscribe((res) =>{
        console.log("Group Get Deleted...");
      });
      //delete entry from data structure
      const index = this.allGroups.findIndex(u => u[0]   === id );
      this.allGroups.splice(index,1);
      //delete entry from groupuser data structure
      this.updateMember(id);
    }
}


/*Folder Operations*/
async createfilefolder(id){
  /*Call file folder dialoger*/
  const parent_resource = this.allResources.find(r => r[0] === id);
  //console.log(parent_resource);
  const dialogRef = this.dialog.open(FileeditorComponent, {
      width: '250px',
      data: parent_resource
      });
  await dialogRef.afterClosed().subscribe(result => {
        //console.log(result);
    this.api.getResource()
    .subscribe((res)=>{
          this.allResources = res['data'];
          //console.log("All list get first...")
        });
  });
  //Update local data structure
  
  

}

renamefolder(id){
  /*Call rename dialoger*/
}

isEmpty(id):boolean{
  return this.allResources.findIndex(u => u[2]   === id ) > -1;
}

deletefolder(id){
  if (id === '1'){
      alert("No one can delete Admin...")
    }
    else{
    if (!this.isEmpty(id)){
       this.api.deleteResource(Number(id))
        .subscribe((res) =>{
        console.log("Folder Get Deleted...");
      });
      //delete entry from data structure
      const index = this.allResources.findIndex(u => u[0]   === id );
      this.allResources.splice(index,1);
      }
     else{
      alert("Folder is not empty...");
      }
    }
}

/*File Operations
1.) First Get Resource Id 
    2.)  make api call to get data
    3.) If data field is not found then Set default data field.
    4.) Pass that struct to FileEditorComponent
    5.) In component file get edited...
*/
editfile(id){
let file_resource = this.allResources.find(r => r[0] === id);
  console.log(file_resource);
    this.api.getResourceById(Number(file_resource[0])).subscribe((res) =>{
      const dialogRef = this.dialog.open(FileEditorComponent, {
      width: '450px',
      data: res['data']
      });
  });
}

deletefile(id){
console.log(id)
  this.api.deleteResource(Number(id))
        .subscribe((res) =>{
        console.log("File Get Deleted...");
      });
      //delete entry from data structure
      const index = this.allResources.findIndex(u => u[0]   === id );
      this.allResources.splice(index,1);
  }



}


