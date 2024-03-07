import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { EmployeeDetailComponent } from './employee-card/employee-detail/employee-detail.component';
import { ProjectsComponent } from './employee-card/projects/projects.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectDetailComponent } from './employee-card/projects/project-detail/project-detail.component';
import { AddProjectComponent } from './employee-card/projects/add-project/add-project.component';
import { ToastrModule } from 'ngx-toastr';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { EventsComponent } from './events/events.component';
import { PasswordStrengthDirective } from './_directives/password-strength.directive';
import { CalanderComponent } from './events/calander/calander.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UpcommingEventsComponent } from './events/upcomming-events/upcomming-events.component';
import { AddEventsComponent } from './events/add-event/add-event.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCardComponent,
    NavComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterEmployeeComponent,
    EmployeeDetailComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    AddProjectComponent,
    EditProfileComponent,
    EventsComponent,
    PasswordStrengthDirective,
    CalanderComponent,
    UpcommingEventsComponent,
    AddEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
