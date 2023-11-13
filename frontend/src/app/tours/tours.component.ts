import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { Event } from '../interfaces/event';
@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {

  events:Event[] = []
  error:boolean = false;
  errorMessage:string = ''

    constructor(private eventsService: EventsService, private router: Router){
    // this.fetchEmployees()

    this.getTourss()
  }

  async getTourss(){
    let response = await this.eventsService.getEvents()
  console.log(response);

  this.events = response.events
  
  }

  

  showTourDetails(event: Event){
    // console.log(index);
   

    console.log(event.event_id);
    
    this.router.navigate(['admin', event.event_id])

  }

  editTour(event: Event){
    // console.log(index);
   

    console.log(event.event_id);
    
    this.router.navigate(['admin','edit', event.event_id])

  }


  async deleteTour(event: Event){
    if (confirm('Are you sure you want to delete this event?')) {
     
      const event_id = event.event_id as string
       let response = await this.eventsService.deleteEvent(event_id)
      
       if(response.error){
        alert(response.error)
  
        setTimeout(() => {
          this.errorMessage = ''
        this.error = false
  
        }, 3000);
  
  
       }
  
       else if(response.message){
        this.getTourss();
  
       }

  }

  }

}
