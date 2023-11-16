import { Component } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  events:Event[] = []
  constructor(private eventsService: EventsService,){
    this.getTourss()
  }


   async getTourss(){
    let response = await this.eventsService.getEvents()
  console.log(response);

  this.events = response.events
  
  }
}
