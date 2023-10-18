import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { LoginComponent } from './login/login.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { EmployeeDetailComponent } from './employee-card/employee-detail/employee-detail.component';
import { ProjectsComponent } from './employee-card/employee-detail/projects/projects.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: "full"
  },
  {
    path: 'employees',
    component: EmployeeCardComponent,
  },
  {
    path: 'employees/detail',
    component: EmployeeDetailComponent
  },
  {
    path: 'employees/detail/project',
    component: ProjectsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterEmployeeComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
