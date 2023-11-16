import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileForm!:FormGroup;

  currentUser!: User;
  newPassword: string = '';
  confirmPassword: string = '';

  fullName: string = '';
  email: string = '';
  phoneNumber: string = '';

  error:boolean = false;
  success:boolean = false;
  errorMessage:string = ''
  successMessage:string = ''


  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router: Router
  ){

    this.fullName = localStorage.getItem('name') as string;
    this.email = localStorage.getItem('email')  as string;
    this.phoneNumber = localStorage.getItem('phone_number') as string;


    this.profileForm = this.fb.group({
      full_name: [this.fullName, [Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      phone_number: [this.phoneNumber, [Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]],
    })
  }


  ngOnInit() {
    // Retrieve individual user details from local storage

    // Construct the currentUser object
    this.currentUser = {
      full_name: this.fullName || "Default Full Name",
      email: this.email || "default@example.com",
      phone_number: this.phoneNumber || "123456789"
    };



  }

async updateProfile() {
    // Your logic to update the user profile, including password reset
    if (this.newPassword !== this.confirmPassword) {
      // Handle password mismatch
      alert("Password and Confirm Password do not match");
      return;
    }

    // Your logic to update the user profile
    // For example, you might want to send an API request to update the user details

    // // Reset the password fields after updating
    // this.newPassword = '';
    // this.confirmPassword = '';


    const x = this.profileForm.value.password

    console.log("profile value is",x)

    let response = await this.authService.resetPassword(this.email,x)

    if(response.error){
      this.error = true
      this.errorMessage = response.error

      setTimeout(() => {
        this.errorMessage = ''
      this.error = false

      }, 3000);


     }

          else if(response.message){
      this.success = true
      this.successMessage = "user Registered successfully"

           setTimeout( async() => {     
            this.success = false
            this.successMessage = ""
      
          // this.router.navigate(['/login'])
        }, 2000);

     }


    alert("Profile updated successfully!");
  }

}
