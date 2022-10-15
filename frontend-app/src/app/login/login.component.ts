import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  msg:string=""

loginRef:FormGroup;

  constructor(public ls:LoginService,public router:Router) { }

  ngOnInit(): void {
    this.loginRef = new FormGroup({
      emailid:new FormControl(null,[Validators.required, Validators.email]),
      password:new FormControl(null,Validators.required),
      typeOfUser:new FormControl(null,Validators.required)
    });
  }

  signIn(){
    let login = this.loginRef.value;
    console.log(login);
    this.ls.signIn(login).subscribe({
      next:(result:any)=>{
        console.log(result);
        if(result=="Admin sucessfully login"){
            sessionStorage.setItem("userDetails",login.emailid);
            this.router.navigate(["adminHome"])
        }else if(result=="User successfully login"){
          sessionStorage.setItem("userDetails",login.emailid);
          this.router.navigate(["userHome"])
        }else {
            this.msg=result;
        }
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }
}
