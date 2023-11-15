import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import { BookingsService } from '../services/bookings.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent {

  bookingForm!: FormGroup;
  successMessage:string = ''
  error: boolean = false;
  errorMessage: string = '';
  name = localStorage.getItem('name')
  disable = true
  constructor(private formBuilder: FormBuilder, private bookingService: BookingsService) {

    this.bookingForm = this.formBuilder.group({
      event_id: ['', Validators.required],
      user_id: [this.name ],
      
    });

   }



  async bookForm() {
    if (this.bookingForm.valid) {

       const response = await this.bookingService.createBooking(this.bookingForm.value)

       if(response.error){
        this.errorMessage = response.error
        alert(response.error)
  
        setTimeout(() => {
          this.errorMessage = ''

        }, 3000);
        
      }else if(response.message){
        


      }

      
    } else {
      // Handle form validation errors
      this.bookingForm.markAllAsTouched();
    }
  }

}
