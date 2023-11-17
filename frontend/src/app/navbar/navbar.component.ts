import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  loggedInTrue = localStorage.getItem('loggedIn');
  name = localStorage.getItem('name');
  loggedIn = this.loggedInTrue;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      searchTerm: [''] 
    });
  }

  ngOnInit(): void {
    // Your existing ngOnInit logic
    this.checkLoggedIn();
  }

  searchTours() {
    const searchTerm = this.searchForm.value.searchTerm;
  
    // Check if the search term is empty
    if (!searchTerm) {
      // Display an alert or handle the case where the search term is empty
      alert('Search field is required');
      return;
    }
  
    // Implement your search logic using the value of searchTerm
    console.log('Searching for tours with term:', searchTerm);
  
    // Additional logic for searching, you can use searchTerm here
  
    // Navigate to the search route with the search term in the URL
    this.router.navigate(['/search'], { queryParams: { term: searchTerm } });
  }
  

  checkLoggedIn() {
    console.log(this.loggedInTrue);
    if (this.loggedInTrue === 'true') {
      // Additional logic if needed when user is logged in
    }
  }

  Logout() {
    this.router.navigate(['login']);
    localStorage.clear();
    console.log(localStorage.getItem('token'));
  }

  date = new Date();
}
