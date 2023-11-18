import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }


  async createReview(rating: number,comment:string,user_id:string) {
    const url = `http://localhost:5000/review/create`;

  const reviewData = {
    rating,
    comment,
    user_id
  }
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })

      const data = await response.json()

      return data
       
   
  }

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

   async getUserReviews(user_id:string){
    let token = localStorage.getItem('token') as string;
    let res = await fetch(`http://localhost:5000/review/${user_id}`, {
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    })

    let data = await res.json()

    return data
    
  }

}
