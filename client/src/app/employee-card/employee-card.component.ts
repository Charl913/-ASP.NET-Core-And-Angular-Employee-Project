import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faTrash, faUserTie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit{
  faTrash = faTrash;
  faUserTie = faUserTie
  

  title = 'Employees';

  baseUrl = 'https://localhost:5001/api/Employees';

  employees: Employee[] = [];

  constructor(private http: HttpClient, private router: Router) {

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

  deleteEmployee(id: number) {
    const employeeToDelete = JSON.stringify(this.employees.filter(q => q.id === id));
    alert('are you sure you want to delete? ' + employeeToDelete);
  }

  addAdmin(id: number) {
    const employeeToMakeAdmin = JSON.stringify(this.employees.filter(q => q.id === id));
    alert('are you sure you want to make admin? ' + employeeToMakeAdmin);
  }
}
