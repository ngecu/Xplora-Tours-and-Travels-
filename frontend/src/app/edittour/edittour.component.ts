import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-edittour',
  templateUrl: './edittour.component.html'
  // styleUrls: './edittour.component.css'
})
export class EdittourComponent implements OnInit {
  editForm!: FormGroup;
  eventId!: string;
  categories: any[] = [];
  role: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private categoriesService: CategoriesService,
    private router: Router
    ) {
    const roleFromLocalStorage = localStorage.getItem('role');
    this.role = roleFromLocalStorage ? parseInt(roleFromLocalStorage, 10) : 0;

    if (this.role !== 1) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      image: ['', Validators.required],
      destination: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      start_date: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category_id: ['', Validators.required],
      active: [1],
    });

    this.eventId = this.route.snapshot.paramMap.get('event_id') as string;
    this.getEventDetails();
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

  async getEventDetails() {
    try {
      const event = await this.eventsService.getOneEvent(this.eventId);
      this.editForm.patchValue(event);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  }

  async onSubmit() {
    if (this.editForm.valid) {
      try {
        const response = await this.eventsService.updateTourDetails(this.editForm.value)
        console.log('Tour updated successfully', response);
        // Redirect or perform any other action upon successful update
      } catch (error) {
        console.error('Error updating tour', error);
        // Handle the error as needed
      }
    }
  }
}
