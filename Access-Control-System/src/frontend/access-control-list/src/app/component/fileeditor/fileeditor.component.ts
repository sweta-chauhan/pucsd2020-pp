import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-fileeditor',
  templateUrl: './fileeditor.component.html',
  styleUrls: ['./fileeditor.component.css']
})


export class FileeditorComponent implements OnInit {
  public resourceForm: FormGroup;
  //fileContent:string;
  //resource;
  rtype = ["File","Folder"];

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<FileeditorComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }
  ngOnInit(): void {
  console.log(this.data);
  let path;
  if (this.data[2]==="0"){
        path = this.data[3];
    }
  else{
      path = this.data[4]+'/'+this.data[3];
  }
  this.resourceForm = this._formBuilder.group(
    {rtype:"File",prnt_id:this.data[0],
     rpath:path,
     rname:'',
     owner:localStorage.getItem('id')});
  console.log(this.resourceForm);	
  }

  onSubmit() {
                let rt;
                if (this.resourceForm.value.rtype === "File"){
                      rt = 1;
                }
                else{
                    rt = 2;
                } 
                const prnt = Number(this.resourceForm.value.prnt_id);
                if (isNaN(this.data.ID)) {
                        if(this.resourceForm.value.rname!=''){
                            this._api.createResource({"id":0,
                            "rtype":rt,
                            "prnt_id":prnt,
                            "rname":this.resourceForm.value.rname,
                            "rpath":this.resourceForm.value.rpath,
                            owner:Number(localStorage.getItem("id")),
                            "data":''}).subscribe(res => {
                                  console.log(res['data']);
                            });

                          this.dialogRef.close();
                          }
                            else{
                              alert("File/Folder name is not specified!!..")
                            }      
              }
              else {
               this.dialogRef.close();
              }

        }

     /*update(content:string){
  this._api.updateResource({"id":this.resource.id,"rtype":this.resource.rtype,"prnt_id":this.resource.print_id,"rname":this.resource.rname,"rpath":this.resource.rpath,owner:Number(localStorage.getItem("id")),"data":content}).subscribe(res => {
    //console.log(res['data']);
    //console.log(content);
    })

    
  }*/

}