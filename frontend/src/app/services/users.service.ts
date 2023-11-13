import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  
  async getUsers(){
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:5000/user/allUsers', {
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

  async getOneUser(user_id: string){
    let token = localStorage.getItem('token') as string

    let res = await fetch(`http://localhost:5000/user/${user_id}`,{
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data.user
  }

  async deleteUser (user_id:string){
    let token = localStorage.getItem('token') as string

    let response = await fetch(`http://localhost:5000/user/${user_id}`,{
       headers:{
         "Content-Type":"application/json",
         "token": token
       },
       method:"DELETE",
    
       
     })
 
     const data = await response.json()
 
     console.log(data)
 
     return data
 
   }

}
