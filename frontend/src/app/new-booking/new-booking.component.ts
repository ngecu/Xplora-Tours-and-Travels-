import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingsService } from '../services/bookings.service';
import { EventsService } from '../services/events.service';
import { Event } from '../interfaces/event';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent {
  events:Event[] = []
  bookingForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  name = localStorage.getItem('name');

  constructor(private eventsService: EventsService, private formBuilder: FormBuilder, private bookingService: BookingsService) {
    this.bookingForm = this.formBuilder.group({
      event_id: ['', Validators.required],
      // user_id: [this.name, Validators.required],
    });

    this.getTourss()

  }

  async bookForm() {
    if (this.bookingForm.valid) {
      const response = await this.bookingService.createBooking(this.bookingForm.value);

      if (response.error) {
        this.errorMessage = response.error;
        alert(response.error);

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      } else if (response.message) {
        this.successMessage = response.message;

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

        // Optionally, you can reset the form after successful submission
        this.bookingForm.reset();
      }
    } else {
      // Handle form validation errors
      this.bookingForm.markAllAsTouched();
    }
  }

    async getTourss(){
    let response = await this.eventsService.getEvents()
  console.log(response);

  this.events = response.events
  
  }

}
