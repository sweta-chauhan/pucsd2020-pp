import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import {FileeditorComponent} from '../fileeditor/fileeditor.component';//To create file/folder
import { FileEditorComponent } from '../file-editor/file-editor.component';
import { FileReaderComponent } from '../file-reader/file-reader.component';



@Component({
  selector: 'app-viewer-portal',
  templateUrl: './viewer-portal.component.html',
  styleUrls: ['./viewer-portal.component.css']
})
export class ViewerPortalComponent implements OnInit {

   allResources;
   allGroups;
   allGroupAccess;
   allUserAccess;
   alluserGroups;
   viewer;
  constructor(private api: ApiService,private router:Router,private dialog?: MatDialog) { }

  ngOnInit(): void {
  this.viewer = localStorage.getItem('id');
  this.data();
  
  }

async data(){
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

    await this.api.getMembershipUser(localStorage.getItem('id'))
    .subscribe((res) => 
        {
          this.alluserGroups = res['data'];
        });
    await this.api.getResource()
    .subscribe((res)=>{
          this.allResources = res['data'];
        });
  }

/*This predicate can be used to find user access*/
	haveAccess(accesslist,rid,id):boolean{
		const have = accesslist.find(acc => acc[1]===id && acc[0]=== rid );
		if (have == undefined ){
			return false;
		}
		else{
			return have[2] == '2';
		}
	}

	/*This predicate with take user groups and groupaccessentry,resource_id and user_id to get access permission*/

	getGroupWiseAccess(groups,groupaccess,rid,uid):boolean{
		for (let grp of groups){
			for (let ga of groupaccess){
				if (grp[0] === ga[1] && ga[0]===rid){
					if (ga[2]==='2'){//Write Access Check
						return true;
					}
					else{
						return false;
					}
				}
			}
		}
		return false;
	}
/*To check ownership of file..*/
	isOwner(rid,uid,resources):boolean{
		const have = resources.find(r => r[0]===rid && r[5] == uid);
    console.log(have);
		if (have == undefined){
			return false;
		}
		else{
			return true;
		}
	}
/*To check folder is empty or not...*/
	isEmpty(id):boolean{
 	 return this.allResources.findIndex(u => u[2]   === id ) > -1;
	}

/*Final Predicate to find access*/
  canWrite(rid,uid):boolean{
      if (this.isOwner(rid,uid,this.allResources))
      {
          console.log("Have Ownership Access");
          return true;
      } else {
                if(this.haveAccess(this.allUserAccess,rid,uid))
                {
                    console.log("Write Access Provided by Admin");
                    return true;
                } else {
                        if(this.getGroupWiseAccess(this.alluserGroups,this.allGroupAccess,rid,uid))
                        {
                            
                            console.log("Group wise write access provided...");
                            return true;
                          }
                        else{
                            console.log("Have Read Access Only");
                            return false;                    
                        }
                      }
          }
  }


 createfilefolder(id){
			const parent_resource = this.allResources.find(r => r[0] === id);
  			//console.log(parent_resource);
  			const dialogRef = this.dialog.open(FileeditorComponent, {
      			width: '250px',
      			data: parent_resource
      		});
  		 dialogRef.afterClosed().subscribe(result => {
    			this.api.getResource()
    			.subscribe((res)=>{
          		this.allResources = res['data'];
        	});
  		});
  
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
      	const index = this.allResources.findIndex(u => u[0]   === id );
      	this.allResources.splice(index,1);
      	}
     	else{
      		alert("Folder is not empty...");
      	}
    	}
	}

  create(id){
    if(this.canWrite(id,this.viewer)){
        console.log("Can Write");
        this.createfilefolder(id); 
      }
      else{
        //console.log("Can Read");
        alert("Oops!! You don't have write access to this resource..");
      }
  }

	filedelete(id){
	 if(this.canWrite(id,this.viewer)){
        console.log("Can Write");
        this.deletefolder(id);
      }
      else{
        console.log("Can Read");
        alert("Oops!! You don't have write access to this resource..");
      }
	}
	folderdelete(id){
      if(this.canWrite(id,this.viewer)){
        //console.log("Can Write");
        this.deletefolder(id);
      }
      else{
        //console.log("Can Read");
        alert("Oops!! You don't have write access to this resource..");
      }
	}

  /**/




  /*Call File-Editor else File-Reader*/
	
  editFile(id){
  let file_resource = this.allResources.find(r => r[0] === id);
  console.log(file_resource);
    this.api.getResourceById(Number(file_resource[0])).subscribe((res) =>{
      const dialogRef = this.dialog.open(FileEditorComponent, {
      width: '450px',
      data: res['data']
      });

    });
  }

  readerFile(id){
  let file_resource = this.allResources.find(r => r[0] === id);
  console.log(file_resource);
    this.api.getResourceById(Number(file_resource[0])).subscribe((res) =>{
      const dialogRef = this.dialog.open(FileReaderComponent, {
      width: '450px',
      data: res['data']
      });
    });
  }




  editfile(id){
      if(this.canWrite(id,this.viewer)){
        console.log("Can Write");
        this.editFile(id);
      }
      else{
        console.log("Can Read");
        this.readerFile(id);
      }
	}
}

