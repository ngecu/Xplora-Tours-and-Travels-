import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent {

  user:User[] = []

  constructor(private usersService: UsersService, private route:ActivatedRoute){
     this.getUserDetails()
  }

  id:string = ''

  async getUserDetails(){
    
    this.route.params.subscribe(params=>{
      this.id = params['user_id']

      console.log(this.id);
      
    })

    let user_d =  await this.usersService.getOneUser(this.id)

    this.user = user_d
  }
}
