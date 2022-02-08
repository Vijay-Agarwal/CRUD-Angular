import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './dashboard.modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  formValue !: FormGroup;
  UserModelObj : UserModel = new UserModel();
  UserData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, 
    private api :ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile_no: ['']
    })
    this.getAllUsersData();
  }
  clickAddUser(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postUserDetails(){
    this.UserModelObj.firstName= this.formValue.value.firstName;
    this.UserModelObj.lastName= this.formValue.value.lastName;
    this.UserModelObj.email= this.formValue.value.email;
    this.UserModelObj.mobile_no= this.formValue.value.mobile_no;

    this.api.postUser(this.UserModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("User Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUsersData();
    },
    err=>{
      alert("Something Went Wrong!!")
    })
  }
  getAllUsersData(){
    this.api.getUser()
    .subscribe(res=>{
      this.UserData = res;
    })
  }
  deleteUser(row : any){
    this.api.deleteUser(row.id)
    .subscribe(res=>{
      alert("User Deleted Successfully");
      this.getAllUsersData();
    })
  }
  onEdit(row : any){
    this.showAdd=false;
    this.showUpdate=true;
      this.UserModelObj.id = row.id;
      this.formValue.controls['firstName'].setValue(row.firstName)
      this.formValue.controls['lastName'].setValue(row.lastName)
      this.formValue.controls['email'].setValue(row.email)
      this.formValue.controls['mobile_no'].setValue(row.mobile_no)
  }
  updateUserDetails(){
    this.UserModelObj.firstName= this.formValue.value.firstName;
    this.UserModelObj.lastName= this.formValue.value.lastName;
    this.UserModelObj.email= this.formValue.value.email;
    this.UserModelObj.mobile_no= this.formValue.value.mobile_no;
    this.api.updateUser(this.UserModelObj,this.UserModelObj.id)
    .subscribe(res=>
      {
        alert("Details Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUsersData();
      })
  }
}

