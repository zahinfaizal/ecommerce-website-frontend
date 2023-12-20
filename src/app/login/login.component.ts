import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor (private fb:FormBuilder,private toaster:ToasterService,private router:Router,private api:ApiService){}

  login(){
    if(this.loginForm.valid){
      const password = this.loginForm.value.password
      const email = this.loginForm.value.email
      const user = {password,email}

      this.api.loginAPI(user).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.existingUser.username} login successfully`)
          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)
          this.loginForm.reset()
          this.router.navigateByUrl("")
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
          this.loginForm.reset()
        }
      })
      
    }else{
      this.toaster.showWarning('Invalid Input')
    }
  }
}
