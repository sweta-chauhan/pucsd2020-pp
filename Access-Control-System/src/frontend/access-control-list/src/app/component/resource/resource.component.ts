import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
	
  newgroup: Object  = {} ;
  
  constructor(private _api : ApiService ) { }
  ResourceName:string;
  ResourcePath:string;
  ngOnInit(): void {
  }

  create(){
    this._api.createResource({"id":0,"rtype":1,"prnt_id":1,"rname":this.ResourceName,"rpath":this.ResourcePath,owner:Number(localStorage.getItem("id")),"data":""}).subscribe(res => {
    })
  }
  delete(){

  }

  cancel(){

  }
}
