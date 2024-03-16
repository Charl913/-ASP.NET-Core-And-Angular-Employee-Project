import { Component } from '@angular/core';
import { Employee } from '../../_models/employee';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Education, Experience } from 'src/app/_models/edit-user-profile';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee: Employee = {} as Employee;
  employeeId: any;
  baseUrl = 'https://localhost:5001/api/employees/';
  currentUserEducation: Education[] = [];
  currentUserExperience: Experience[] = [];


  constructor(private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['data'] || null;
    });
    this.getEmployeeDetails(this.employeeId);

    this.http.get<Education>('https://localhost:5001/api/EmployeeEducation/' + this.employeeId).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.currentUserEducation = data;
      }
    });

    this.http.get<Experience>('https://localhost:5001/api/EmployeeExperience/' + this.employeeId).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.currentUserExperience = data;
      }
    });
  }

  getEmployeeDetails(id: number) {
    return this.http.get<Employee>(this.baseUrl + id).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.employee = data;
      }
    });
  }
}
