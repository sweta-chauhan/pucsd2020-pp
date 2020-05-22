import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.css']
})
export class GroupDialogComponent implements OnInit {
	public groupForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<GroupDialogComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit(): void {
  //console.log("Hello")
  //	console.log(this.data);
  	this.groupForm = this._formBuilder.group({id:Number(this.data[0]),gname:this.data[1]});
  }

  onSubmit() {
                //console.log(this.groupForm.value)
                if (isNaN(this.data.ID)) {
                  this._api.updateGroup(this.groupForm.value).subscribe(res => {});
                  this.dialogRef.close();
                } else {
                this.dialogRef.close();
    }
  }
}
