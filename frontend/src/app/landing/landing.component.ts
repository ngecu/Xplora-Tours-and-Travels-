import { Component } from '@angular/core';
import { Event } from '../interfaces/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  events:Event[] = []
  upcomingEvents: Event[] = []
  pastEvents: Event[] = []
  
  constructor(private eventsService: EventsService,){
    this.getTourss()
  }


   async getTourss(){
    let response = await this.eventsService.getEvents()
  console.log(response.events);

  this.events = response.events

  
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  
}
