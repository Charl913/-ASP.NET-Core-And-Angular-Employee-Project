import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  title = 'Employees';

  baseUrl = 'https://localhost:5001/api/Users';

  employees: Employee[] =[];

  constructor(private http: HttpClient) {

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

  setUser(id: number) {
    const data = this.employees
    if(data !== null){
      const employee = data.find((e: { id: number; }) => e.id === id);
      console.log(employee)
      localStorage.setItem('employee', JSON.stringify(employee))
    }    
  }
}
