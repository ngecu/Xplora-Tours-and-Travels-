import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor() { }

async createBooking(bookingData: any) {
    const url = `http://localhost:5000/user/register`;

  
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()

      return data
       
   
  }

}
