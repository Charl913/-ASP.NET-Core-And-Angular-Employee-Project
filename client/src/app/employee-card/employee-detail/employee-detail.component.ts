import { Component } from '@angular/core';
import { Employee } from '../../_models/employee';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee: Employee = {} as Employee;
  employeeId: any;
  baseUrl = 'https://localhost:5001/api/employees/'


  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['data'] || null
    })
    this.getEmployeeDetails(this.employeeId)
  }

  getEmployeeDetails(id: number) {
    return this.http.get<Employee>(this.baseUrl + id).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res))
        this.employee = data
      }
    });
  }
}
