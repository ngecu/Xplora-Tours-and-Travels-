import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  role: number;

  constructor(private router: Router) {
    const roleFromLocalStorage = localStorage.getItem('role');
    // Parse the string to a number or use a default value if it's not a valid number
    this.role = roleFromLocalStorage ? parseInt(roleFromLocalStorage, 10) : 0;

    if (this.role !== 1) {
      this.router.navigate(['']);
    }
  }
}
