import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  profileForm!: FormGroup;

  constructor(private usersService: UsersService,private fb: FormBuilder,private route:ActivatedRoute) { 


  }

  id:string = ''
  user:User[] = []

  async getUserDetails(){
    
    this.route.params.subscribe(params=>{
      this.id = params['user_id']
    })

    let user_d =  await this.usersService.getOneUser(this.id)
    this.user = user_d;

    return user_d
  }


  ngOnInit(): void {

this.getUserDetails()

    this.profileForm = this.fb.group({
      full_name: [{ value: this.user[0].full_name, disabled: true }, Validators.required],
      email: [{ value: this.user[0].email, disabled: true }, [Validators.required, Validators.email]],
      phone_number: [this.user[0].phone_number, Validators.required],
      current_password: [''],
      new_password: [''],
      confirm_password: ['']
    });
  }

  onSubmit() {
    // Handle form submission here
    if (this.profileForm.valid) {
      const updatedUserData = this.profileForm.value;
      // Call a service to update user data
      // userService.updateUserProfile(updatedUserData).subscribe(response => {
      //   console.log('Profile updated successfully', response);
      // });
    }
  }
}
