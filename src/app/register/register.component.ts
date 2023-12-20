import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb:FormBuilder,private toaster:ToasterService, private router:Router,private api:ApiService){}
  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const password = this.registerForm.value.password
      const email = this.registerForm.value.email
      const user = {username,password,email}

      this.api.registerAPI(user).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.username} register successfully`)
          this.registerForm.reset()
          this.router.navigateByUrl('/user/login')
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
          this.registerForm.reset()
        }
      })
      
    }else{
      this.toaster.showWarning('Invalid Input')
    }
  }
}
