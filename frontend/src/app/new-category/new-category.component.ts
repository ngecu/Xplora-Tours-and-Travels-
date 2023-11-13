import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {
  categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, private router: Router) {
    this.categoryForm = this.formBuilder.group({
      category_name: ['', Validators.required],
    });

  }



  

 async onSubmit() {
    if (this.categoryForm.valid) {
   let response = await   this.categoriesService.createCategory(this.categoryForm.value)
        if(response.message){
          console.log('Category created successfully', response);
          this.router.navigate(['/categories']);
        }
        else if(response.error){
          alert(response.error)
        }
      
    }
  }
}
