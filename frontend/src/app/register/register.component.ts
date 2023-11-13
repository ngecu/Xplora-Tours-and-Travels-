import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm!:FormGroup
  error:boolean = false;
  errorMessage:string = ''

  constructor(private fb:FormBuilder,private authService:AuthService ){

    this.registrationForm = this.fb.group({
      full_name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone_number: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]],
    })
  }

  async createUser(){
    
    let user_details: User = this.registrationForm.value;
    
    if(user_details.password != user_details.confirm_password){
      this.error = true
      this.errorMessage = "Password Mismatch"

      setTimeout(() => {
        this.errorMessage = ''
      this.error = false

      }, 3000);

    }
    else{
     let response = await this.authService.registerUser(user_details)
     if(response.error){
      this.error = true
      this.errorMessage = response.error

      setTimeout(() => {
        this.errorMessage = ''
      this.error = false

      }, 3000);


     }
    }
    

  }

}
