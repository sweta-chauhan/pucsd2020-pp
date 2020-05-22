import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent implements OnInit {
  public fileForm: FormGroup;
  data:string;
  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<FileEditorComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data_c: any) { }
  
  onNoClick(): void {
    this.dialogRef.close();
   }
  ngOnInit(): void {
      //console.log(this.data_c)
      this.fileForm=this._formBuilder.group({
      id:[this.data_c.id],
      rtype:[this.data_c.rtype],
      prnt_id:[this.data_c.prnt_id],
      rname:[this.data_c.rname],
      rpath:[this.data_c.rpath],
      owner:[this.data_c.owner],
      data:[this.data_c.data],
      });
      //console.log(this.fileForm);
  }

onSubmit(){
  this._api.updateResource(this.fileForm.value).subscribe(res => {
    console.log(res['data']);
    });
    this.dialogRef.close();
}

/*
  update(content:string){
	this._api.updateResource({"id":this.resource.id,"rtype":this.resource.rtype,"prnt_id":this.resource.prnt_id,"rname":this.resource.rname,"rpath":this.resource.rpath,owner:Number(localStorage.getItem("id")),"data":content}).subscribe(res => {
		//console.log(res['data']);
		//console.log(content);
    })
  }
  */
}
