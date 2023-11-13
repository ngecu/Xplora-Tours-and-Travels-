import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  async geCategroies(){
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:5000/category/allCategories', {
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data
    
  }

  async createCategory(category:Category){
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:5000/category', {
      headers:{
        "Content-type": "application/json",
        "token": token
      },
      method:"POST",
      body:JSON.stringify(category)
    })

    let data = await res.json()

    return data
    
  }



  async getOneCategory(user_id: string){
    let token = localStorage.getItem('token') as string

    let res = await fetch(`http://localhost:5000/category/${user_id}`,{
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data.user
  }

  async deleteCategory (user_id:string){
    let token = localStorage.getItem('token') as string

    let response = await fetch(`http://localhost:5000/category/${user_id}`,{
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
