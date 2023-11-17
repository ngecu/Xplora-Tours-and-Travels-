import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent {
  searchTerm!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the search term from the URL
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];
      // Now, you can use this.searchTerm in your component as needed
      console.log('Search term:', this.searchTerm);
    });
  }
}