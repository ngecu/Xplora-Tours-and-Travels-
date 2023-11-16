import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor() { }

async createBooking(x: any,event_id:string) {
    const url = `http://localhost:5000/booking/create`;

  const bookingData = {
    user_id:x,
    event_id
  }
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
