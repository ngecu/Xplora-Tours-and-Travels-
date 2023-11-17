import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../interfaces/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent  {
  tour!: Event;
  events:Event[] = []
  constructor(private route: ActivatedRoute, private eventService: EventsService) { 
    this.getTourss()

    this.route.params.subscribe(params => {
      const tour_id = params['tour_id'] as string

      if (tour_id) {
        console.log("event id is ",tour_id);
        
        this.getTourDetails(tour_id);
      }
    });
  }


  async getTourDetails(event_id: string) {
    try {
      const response = await this.eventService.getOneEvent(event_id);
      console.log('Tour details:', response);
      this.tour = response
    } catch (error) {
      console.error('Error fetching tour details:', error);
      // Handle error as needed
    }
  }

  
  async getTourss(){
    let response = await this.eventService.getEvents()
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
