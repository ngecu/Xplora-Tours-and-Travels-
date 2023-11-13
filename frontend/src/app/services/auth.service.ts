import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { userLogin } from '../interfaces/userLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async registerUser (user:User){
   let response = await fetch("http://localhost:5000/user/register",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify(user)
      
    })

    const data = await response.json()

    console.log(data)

    return data

  }

  async login(userLogins: userLogin){
    let response = await fetch('http://localhost:5000/user/login', {
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userLogins)
    })

    const data = await response.json()
    let token = data.token
    localStorage.setItem('token', token)

    console.log(token);
    

    return data
  }
}

