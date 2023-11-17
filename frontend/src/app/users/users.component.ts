import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:User[] = []
  error:boolean = false;
  errorMessage:string = ''

  constructor(private usersService: UsersService, private router: Router){
    // this.fetchEmployees()

    this.getUsers()
  }

  async getUsers(){
    let response = await this.usersService.getUsers();
  console.log(response);

  this.users = response.users
  
  }


  showProfileDetails(user: User){
    // console.log(index);
   

    console.log(user.user_id);
    
    this.router.navigate(['admin', user.user_id])

  }

  editProfile(user: User){
    // console.log(index);
   

    console.log(user.user_id);
    
    this.router.navigate(['admin','edit', user.user_id])

  }


  async deleteUser(user: User){
    if (confirm('Are you sure you want to delete this user?')) {
     
      const user_id = user.user_id as string
       let response = await this.usersService.deleteUser(user_id)
      
       if(response.error){
        alert(response.error)
  
        setTimeout(() => {
          this.errorMessage = ''
        this.error = false
  
        }, 3000);
  
  
       }
  
       else if(response.message){
        this.getUsers();
  
       }

  }

  }

  async toggleActivation(user: User) {
    try {
      // Toggle the activation status
      const newActivationStatus = user.active === 1 ? 0 : 1;

      // Call your service method to update the activation status using async/await
      const response = await this.usersService.updateActivationStatus(user.user_id as string, newActivationStatus)

      // Update the local user object with the new activation status
      user.active = newActivationStatus;
      console.log(`User ${user.full_name} is now ${newActivationStatus === 1 ? 'activated' : 'deactivated'}.`);
    } catch (error) {
      console.error('Error toggling activation status:', error);
      // Handle error as needed
    }
  }
}
