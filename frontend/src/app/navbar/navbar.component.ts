import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Collapse,
  Dropdown,
  initTE,
} from "tw-elements";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  loggedInTrue = localStorage.getItem('loggedIn');
  name = localStorage.getItem('name');
  role = Number(localStorage.getItem('role')) ;

  loggedIn = this.loggedInTrue;

  constructor(private fb: FormBuilder, private router: Router) {
    
    this.searchForm = this.fb.group({
      searchTerm: [''] 
    });
  }

  ngOnInit(): void {
    initTE({ Collapse, Dropdown });
    this.checkLoggedIn();
  }


  searchTours() {
    const searchTerm = this.searchForm.value.searchTerm;
    if (!searchTerm) {
      alert('Search field is required');
      return;
    }
  
    console.log('Searching for tours with term:', searchTerm);
    this.router.navigate(['/search'], { queryParams: { term: searchTerm } });
  }
  

  checkLoggedIn() {
    console.log(this.loggedInTrue);
    if (this.loggedInTrue === 'true') {
    }
  }

  Logout() {
    this.router.navigate(['login']);
    localStorage.clear();
    console.log(localStorage.getItem('token'));
  }

  date = new Date();
}
