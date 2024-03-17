import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../_models/employee';
import { URLS } from '../environments/urls.environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeDetails(id: number) {
    return this.http.get<Employee>(URLS.employeeURL + id);
  }
}
