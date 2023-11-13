import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories:Category[] = []

  constructor(private categoriesService: CategoriesService, private router: Router){
    // this.fetchEmployees()

    this.getCategories()
  }

  async getCategories(){
    let response = await this.categoriesService.geCategroies();
  console.log(response);

  this.categories = response.categories
  
  }


  showCategoryDetails(category: Category){
    // console.log(index);
   

    console.log(category.category_id);
    
    this.router.navigate(['admin', category.category_id])

  }

  navigateToNewCategory(){
    this.router.navigate(['new_category'])

  }

  editProfile(category: Category){
    // console.log(index);
   

    console.log(category.category_id);
    
    this.router.navigate(['admin','edit', category.category_id])

  }


  async deleteUser(category: Category){
    if (confirm('Are you sure you want to delete this category?')) {
     
      const category_id = category.category_id as string
       let response = await this.categoriesService.deleteCategory(category_id)
      
       if(response.error){
        alert(response.error)
  
  
       }
  
       else if(response.message){
        this.getCategories();
  
       }

  }

  }

}
