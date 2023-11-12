import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async registerUser (user:User){
    fetch("",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify(user)
      
    })
  }
}
