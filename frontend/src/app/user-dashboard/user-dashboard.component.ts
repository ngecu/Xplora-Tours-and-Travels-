import { Component } from '@angular/core';
import { Booking } from '../interfaces/booking';
import { Review } from '../interfaces/review';
import { Modal, Ripple, initTE, Tab, Input } from 'tw-elements';
import { BookingsService } from '../services/bookings.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  bookings: Booking[] = [];
  reviews: Review[] = [];

  constructor(private bookingsService: BookingsService, private router: Router){
    // this.fetchEmployees()

    
  }
  

  showSadImage: boolean = true;
  user_id = localStorage.getItem('user_id') as string
  ngOnInit() {
    initTE({ Tab, Input });
    initTE({ Modal, Ripple });
    this.getMyBookings()
  }

    async getMyBookings(){
    let response = await this.bookingsService.getUserBookings(this.user_id)
  console.log("booking ",response.bookings);

  this.bookings = response.bookings
  
  }


}
