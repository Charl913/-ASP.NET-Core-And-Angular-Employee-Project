import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLS } from '../environments/urls.environment';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-employee-most-projects-finished',
  templateUrl: './employee-most-projects-finished.html',
  styleUrls: ['./employee-most-projects-finished.css']
})
export class EmployeeMostProjectsCompleted implements OnInit {
  employees: Employee = {} as Employee;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get(URLS.employeeURL + 'most-projects-finished').subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.employees = data;
      }
    });
  }

}
