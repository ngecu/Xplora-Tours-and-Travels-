import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventsService } from '../services/events.service';
import { CategoriesService } from '../services/categories.service'; // Import the service for categories

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css'],
})
export class NewTourComponent  {
  eventForm!: FormGroup;
  categories: any[] = []; // Array to store categories

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private categoriesService: CategoriesService, // Inject the service for categories
    private router: Router
  ) {
    this.eventForm = this.formBuilder.group({
      destination: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      start_date: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category_id: ['', Validators.required],
    });

    this.getCategories()
  }


  async  getCategories(){
    let response = await this.categoriesService.geCategroies()
    if(response){
      console.log(response);
      
      this.categories = response.categories
    }
    
   }

   
  

   async onSubmit() {
    if (this.eventForm.valid) {
      try {
        const response = await this.eventsService.createEvent(this.eventForm.value);
        console.log(response);
        
        if (response.message) {
          console.log('Event created successfully', response);
          // Redirect to the events list page or perform any other action
          this.router.navigate(['admin/tours']);
        } else if (response.error) {
          alert(response.error);
        }
      } catch (error) {
        console.error('Error creating event', error);
      }
    }
  }
}
