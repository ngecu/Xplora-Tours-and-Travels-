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
    let name = data.info.full_name
    let email = data.info.email
    let phone_number = data.info.phone_number
    let user_id = data.info.user_id

    return {role,name,email,phone_number,user_id}
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
 
  
 
     return data
 
   }

   async updateActivationStatus(user_id: string, newActivationStatus: number) {
    try {
      const token = localStorage.getItem('token') || '';
      const url = `http://localhost:5000/user/${user_id}`;
      const headers = {
        'Content-Type': 'application/json',
        'token': token
      };
  
   
      const response = await fetch(url, {
        headers: headers,
        method: 'PUT', 

        body: JSON.stringify( {active:newActivationStatus} )
      });
  
      const data = await response.json();
      // console.log("dat is ",data);
      

      return data;
    } catch (error) {
      throw error;
    }
  }
  
}
   

