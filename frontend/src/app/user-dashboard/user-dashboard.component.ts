import { Component } from '@angular/core';
import { Booking } from '../interfaces/booking';
import { Review } from '../interfaces/review';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  bookings: Booking[] = [];
  reviews: Review[] = [];

  showSadImage: boolean = true;
}
