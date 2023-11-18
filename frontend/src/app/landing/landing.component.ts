import { Component } from '@angular/core';
import { Event } from '../interfaces/event';
import { EventsService } from '../services/events.service';
import {
  Carousel,
  initTE,
} from "tw-elements";
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  events:Event[] = []
  upcomingEvents: Event[] = []
  pastEvents: Event[] = []
  categories: any[] = [];
  // Add these properties to your component class
isDarkOverlay: boolean = false;
isHovered: boolean = false;

  
  constructor(private eventsService: EventsService, private categoriesService: CategoriesService,){
    this.getTourss()
    this.getCategories();
    initTE({ Carousel });
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
  
  async getCategories() {
    try {
      const response = await this.categoriesService.geCategroies();
      if (response) {
        console.log(response);
        
        this.categories = response;
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

}
