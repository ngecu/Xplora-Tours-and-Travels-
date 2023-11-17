import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../interfaces/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent {
  searchTerm!: string;
  events!: Event[]

  constructor(private route: ActivatedRoute,private eventService:EventsService) {
    
  }

  ngOnInit() {
    // Retrieve the search term from the URL
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];
      this.getFilteredEvents(params['term'])
      // Now, you can use this.searchTerm in your component as needed
      console.log('Search term:', this.searchTerm);
    });
  }

  async getFilteredEvents(s:string) {
    try {
      const data: any = await this.eventService.getEventsBySearchTerm(s);
      // Handle the filtered events
      console.log('Filtered Events:', data.events);

      this.events = data.events
      return data.events;
    } catch (error) {
      console.error('Error fetching filtered events:', error);
      return []; // Handle the error as needed, and return an empty array for this example
    }
  }

}