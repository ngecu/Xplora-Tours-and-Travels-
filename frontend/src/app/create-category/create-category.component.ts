import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  role: number;

  constructor(private router: Router) {
    const roleFromLocalStorage = localStorage.getItem('role');
    this.role = roleFromLocalStorage ? parseInt(roleFromLocalStorage, 10) : 0;

    if (this.role !== 1) {
      this.router.navigate(['']);
    }
  }
}
