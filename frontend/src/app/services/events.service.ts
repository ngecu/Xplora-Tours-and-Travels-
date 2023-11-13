import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  constructor() { }

  async getEvents(){
    let token = localStorage.getItem('token') as string;
    let res = await fetch('http://localhost:5000/events/allEvents', {
      headers:{
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

    return data.event;
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
}
