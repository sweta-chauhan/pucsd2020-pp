import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent implements OnInit {

	public fileForm: FormGroup;
  data:string;
  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<FileReaderComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data_c: any) { }

  ngOnInit(): void {
  this.fileForm=this._formBuilder.group({
      id:[this.data_c.id],
      rtype:[this.data_c.rtype],
      prnt_id:[this.data_c.prnt_id],
      rname:[this.data_c.rname],
      rpath:[this.data_c.rpath],
      owner:[this.data_c.owner],
      data:[this.data_c.data],
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
   }

 onSubmit(){
  	/*this._api.updateResource(this.fileForm.value).subscribe(res => {
    	console.log(res['data']);
    	});*/
    	this.dialogRef.close();
	}
}
