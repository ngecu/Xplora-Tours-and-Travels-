import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm!:FormGroup


  constructor(private fb:FormBuilder,private authService:AuthService ){

    this.registrationForm = this.fb.group({
      fullName: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone_number: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]],
    })
  }

  createUser(){
    

  }

}
