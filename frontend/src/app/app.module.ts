import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ToursComponent } from './tours/tours.component';
import { UsersComponent } from './users/users.component';
import { IndividualtourComponent } from './individualtour/individualtour.component';
import { TourComponent } from './tour/tour.component';
import { SingleuserComponent } from './singleuser/singleuser.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewTourComponent } from './new-tour/new-tour.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ToursComponent,
    UsersComponent,
    IndividualtourComponent,
    TourComponent,
    UserEditComponent,
    CreateCategoryComponent,
    CategoriesComponent,
    NewCategoryComponent,
    NewTourComponent,
    BookingsComponent,
    LandingComponent,
    ReviewsComponent,
    FooterComponent,
    SingleuserComponent,
    NewBookingComponent,
    SearchpageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
