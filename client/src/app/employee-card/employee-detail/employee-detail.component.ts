import { Component } from '@angular/core';
import { Employee } from '../../_models/employee';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Education, Experience } from 'src/app/_models/edit-user-profile';
import { URLS } from 'src/app/environments/urls.environment';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee: Employee = {} as Employee;
  employeeId: any;
  currentUserEducation: Education[] = [];
  currentUserExperience: Experience[] = [];


  constructor(private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['data'] || null;
    });
    this.getEmployeeDetails(this.employeeId);

    this.http.get<Education>(URLS.employeeEducationURL + this.employeeId).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.currentUserEducation = data;
      }
    });

    this.http.get<Experience>(URLS.employeeExperienceURL + this.employeeId).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.currentUserExperience = data;
      }
    });
  }

  getEmployeeDetails(id: number) {
    return this.http.get<Employee>(URLS.employeeURL + id).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.employee = data;
      }
    });
  }
}
