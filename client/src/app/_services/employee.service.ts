import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'https://localhost:5001/api/employees/'

  constructor(private http: HttpClient) { }

  getEmployeeDetails(id: number) {
    return this.http.get<Employee>(this.baseUrl + id);
  }
}
