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

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'user',component:UserDashboardComponent},
  {path:'admin',component:AdminDashboardComponent},
  {path:'admin/tours',component:ToursComponent},
  {path:'admin/users',component:UsersComponent},
  {path: 'admin/:user_id', component: SingleuserComponent},
  {path: 'admin/edit/:user_id', component: UserEditComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
