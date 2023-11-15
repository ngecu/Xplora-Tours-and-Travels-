import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }

  async getReviews(){
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:5000/review/allReviews', {
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data
    
  }

  
  async getOneReview(review_id: string){
    let token = localStorage.getItem('token') as string

    let res = await fetch(`http://localhost:5000/review/${review_id}`,{
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data.review
  }

  async deleteReview (review_id:string){
    let token = localStorage.getItem('token') as string

    let response = await fetch(`http://localhost:5000/review/${review_id}`,{
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
