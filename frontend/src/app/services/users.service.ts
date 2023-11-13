import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  
  async getUsers(){
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:5000/user', {
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data
    
  }

  async checkDetails(){
    let token = localStorage.getItem('token') as string
    let res = await fetch('http://localhost:5000/user/check_user_details',{
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    let role = data.info.role

    return role
  }

  async getOneEmployee(user_id: string){
    let token = localStorage.getItem('token') as string

    let res = await fetch(`http://localhost:4400/user/${user_id}`,{
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data.user
  }

}
