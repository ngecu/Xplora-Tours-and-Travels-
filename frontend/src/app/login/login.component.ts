import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { userLogin } from '../interfaces/userLogin';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
  
  constructor (private userAuth: AuthService, private router: Router){

    
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

      // let role = await this.employeeService.checkDetails()
      
      // console.log(role);
      

      setTimeout( async() => {
        this.successMessage = ''
        this.loggedInState = false
        
        // if(role == 'admin'){
        //   this.router.navigate(['admin'])
        // }else if(role == 'employee'){
        //   this.router.navigate(['employee'])
        // }
      }, 2000);
 
    }
    
  

}

}
