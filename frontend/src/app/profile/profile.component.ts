import { Component } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser! : User 

  constructor (){
    this.currentUser = {
      full_name:"Robin",
      email:"devngecu@gmail.com",
      password:"I@mrich254",
      confirm_password:"I@mrich254",
      phone_number:"070758092"
    }
  }
}
