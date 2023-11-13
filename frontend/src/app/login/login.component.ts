import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { userLogin } from '../interfaces/userLogin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
  
  constructor (private fb:FormBuilder,private userAuth: AuthService, private router: Router,private userService: UsersService, ){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],

    })
    
  }

  errorMessage:string = ''
  successMessage:string = ''
  loggingIn:boolean = false
  loggedInState:boolean = false

  loggedIn = false


  async loginUser(){
let user_details = this.loginForm.value
    let response = await this.userAuth.login(user_details)


    if(response.error){
      this.loggingIn = true
      this.errorMessage = response.error

      setTimeout(() => {
        this.errorMessage = ''
        this.loggingIn = false
      }, 3000);
      
    }else if(response.message){
      this.loggedInState = true
      this.successMessage = response.message
      this.loggedIn = true

      localStorage.setItem('loggedIn', `${this.loggedIn}`)  

      let role = await this.userService.checkDetails()
      
      console.log(role);
      

      setTimeout( async() => {
        this.successMessage = ''
        this.loggedInState = false
        
        if(role == 1){
          this.router.navigate(['admin'])
        }else if(role == 0){
          this.router.navigate(['user'])
        }
      }, 2000);
 
    }
    
  

}

}
