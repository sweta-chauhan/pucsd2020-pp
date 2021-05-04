import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-member-dialrer',
  templateUrl: './member-dialrer.component.html',
  styleUrls: ['./member-dialrer.component.css']
})
export class MemberDialrerComponent implements OnInit {
	public memberForm: FormGroup;
	user_id = [];
  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<MemberDialrerComponent>,
  private _api: ApiService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit(): void {
  	this.user_id = this.data.user_id
  	this.memberForm = this._formBuilder.group(
  	{id:this.data.id,
  	 user_id:[this.data.user_id]})
  	//console.log(this.memberForm)
  }
  onSubmit() {
                //console.log(this.memberForm.value)
                const id = Number(this.memberForm.value.id);
                const user_id = Number(this.memberForm.value.user_id);
                if (isNaN(this.data.ID)) {
                  this._api.addUserGroup({"id":id,"user_id":user_id}).subscribe(res => {});
                  this.dialogRef.close();
                } else {
                this.dialogRef.close();
    }
  }

}
