import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ToursComponent } from './tours/tours.component';
import { UsersComponent } from './users/users.component';
import { SingleuserComponent } from './singleuser/singleuser.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewTourComponent } from './new-tour/new-tour.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LandingComponent } from './landing/landing.component';
import { TourComponent } from './tour/tour.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { EdittourComponent } from './edittour/edittour.component';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login',component:LoginComponent},

  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'user',component:UserDashboardComponent},
  {path:'admin',component:AdminDashboardComponent},
  {path:'admin/tours',component:ToursComponent},
  {path:'admin/users',component:UsersComponent},
  {path: 'admin/edit/:user_id', component: UserEditComponent},
  {path: 'admin/bookings', component: BookingsComponent},
  {path: 'admin/reviews', component: ReviewsComponent},

  {path: 'new_category', component: NewCategoryComponent},
  {path: 'new_tour', component: NewTourComponent},

  {path: 'categories', component: CategoriesComponent},
  {path: 'admin/:user_id', component: SingleuserComponent},
  {path: 'tour/:tour_id', component: TourComponent},
  {path: 'admin/edittour/:tour_id', component: EdittourComponent},

  {path: 'new_booking', component: NewBookingComponent},
  
  {path: 'search', component: SearchpageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
