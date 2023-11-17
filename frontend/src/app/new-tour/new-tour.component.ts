import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventsService } from '../services/events.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css'],
})
export class NewTourComponent implements OnInit {
  eventForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      destination: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      start_date: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category_id: ['', Validators.required],
    });

    this.getCategories();
  }

  async getCategories() {
    try {
      const response = await this.categoriesService.geCategroies();
      if (response && response.categories) {
        this.categories = response.categories;
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      try {
        const response = await this.eventsService.createEvent(this.eventForm.value);
        if (response.message) {
          console.log('Event created successfully', response);
          this.router.navigate(['']);
        } else if (response.error) {
          alert(response.error);
        }
      } catch (error) {
        console.error('Error creating event', error);
      }
    }
  }
}
