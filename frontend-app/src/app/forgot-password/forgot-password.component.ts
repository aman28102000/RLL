import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loginRef = new FormGroup({
    emailid:new FormControl(),
    password:new FormControl(),
    typeOfUser:new FormControl()
  });
  msg:string=""

  constructor(public ls:LoginService) { }

  ngOnInit(): void {
  }
  forgotPassword() {
    let login = this.loginRef.value;
    this.ls.forgotPassword(login).subscribe({
      next:(result:any)=>this.msg=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }

}
