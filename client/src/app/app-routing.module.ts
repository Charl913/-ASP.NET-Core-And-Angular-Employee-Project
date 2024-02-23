import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { LoginComponent } from './login/login.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { EmployeeDetailComponent } from './employee-card/employee-detail/employee-detail.component';
import { ProjectsComponent } from './employee-card/projects/projects.component';
import { ProjectDetailComponent } from './employee-card/projects/project-detail/project-detail.component';
import { AddProjectComponent } from './employee-card/projects/add-project/add-project.component';
import { AuthGuard } from './_guards/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: "full",
  },
  {
    path: 'employees',
    component: EmployeeCardComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    children: [
      {path: 'detail', component: EmployeeDetailComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'projects/project-detail', component: ProjectDetailComponent},
      {path: 'projects/add-project', component: AddProjectComponent}
    ]
  },
  {
    path: 'register',
    component: RegisterEmployeeComponent
  },
  {
    path: 'edit',
    component: EditProfileComponent
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
