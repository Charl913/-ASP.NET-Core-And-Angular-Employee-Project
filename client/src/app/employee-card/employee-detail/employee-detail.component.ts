import { Component } from '@angular/core';
import { Employee } from '../../_models/employee';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee: Employee = {} as Employee;


  constructor() {

  }

  ngOnInit(): void {
    this.employee = JSON.parse(localStorage.getItem('employee')!)
  }
}