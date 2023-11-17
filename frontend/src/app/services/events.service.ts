import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  constructor() { }

  async getEvents(destination?: string) {
    let token = localStorage.getItem('token') as string;

    // Modify the URL based on whether a destination is provided
    let url = 'http://localhost:5000/events/allEvents';
    if (destination) {
      url += `?destination=${destination}`;
    }

    let res = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        "token": token
      }
    });

    let data = await res.json();

    return data;
  }

  async createEvent(event: Event){
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:5000/events', {
      headers:{
        "Content-type": "application/json",
        "token": token
      },
      method:"POST",
      body:JSON.stringify(event)
    });

    let data = await res.json();

    return data;
  }

  async getOneEvent(event_id: string){
    let token = localStorage.getItem('token') as string;

    let res = await fetch(`http://localhost:5000/events/${event_id}`, {
      headers:{
        "Content-type": "application/json",
        "token": token
      }
    });

    let data = await res.json();

    return data;
  }

  async deleteEvent(event_id: string){
    let token = localStorage.getItem('token') as string;

    let response = await fetch(`http://localhost:5000/events/${event_id}`,{
      headers:{
        "Content-Type":"application/json",
        "token": token
      },
      method:"DELETE"
    });

    const data = await response.json();

    console.log(data);

    return data;
  }

    async getEventsBySearchTerm(searchTerm: string){

    let response = await fetch(`http://localhost:5000/events/filter/?search${searchTerm}`,{
      headers:{
        "Content-Type":"application/json",
      },
      method:"GET"
    });

    const data = await response.json();

    console.log(data);

    return data;
  }

  private apiUrl = 'http://localhost:5000/events';

  async updateTourDetails(updatedEvent: Event): Promise<Event> {
    const token = localStorage.getItem('token') || '';
    const url = `${this.apiUrl}/${updatedEvent.event_id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(updatedEvent),
      });

      const data = await response.json();
      console.log('Tour details updated successfully', data);
      return data;
    } catch (error) {
      console.error('Error updating tour details', error);
      throw error; // Rethrow the error for the component to handle
    }
  }


  
}
