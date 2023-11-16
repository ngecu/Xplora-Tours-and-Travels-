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

  async resetPassword(email: string, newPassword: string): Promise<any> {
    const resetData = {
      email: email,
      newPassword: newPassword,
    };

    try {
      let token = localStorage.getItem('token') as string

      const response = await fetch("http://localhost:5000/user/resetPassword", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token':token
        },
        body: JSON.stringify(resetData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }

}

