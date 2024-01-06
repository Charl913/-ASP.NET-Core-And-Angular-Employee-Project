import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../_services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit{
  title = 'Employees';

  baseUrl = 'https://localhost:5001/api/Employees';

  employees: Employee[] = [];

  constructor(private http: HttpClient, private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe({
      next: response => {
        const data = JSON.parse(JSON.stringify(response));
        this.employees = data;
        return this.employees
      },
      error: error => console.log(error)
    });
  }

  setDetails(id: number) {
    this.router.navigate(['employees/detail'], { queryParams: { data: id } });
  }

  setProjects(id: number) {
    this.router.navigate(['employees/projects'], { queryParams: { data: id } });
  }
}
