import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'

  private currentEmployeeSource = new BehaviorSubject<Employee | null>(null);
  currentEmployee$ = this.currentEmployeeSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<Employee>(this.baseUrl + 'account/login', model).pipe(
      map((response: Employee) => {
        const employee = response;
        if (employee) {
          this.setCurrentUser(employee);
        }
      })
    );
  }

  register(value: any) {
    return this.http.post<Employee>(this.baseUrl + 'account/register', value).pipe(
      map(employee => {
        return employee;
      })
    );
  }

  setCurrentUser(employee: Employee) {
    this.currentEmployeeSource.next(employee);
    localStorage.setItem('employee', JSON.stringify(employee));
  }

  logout() {
    localStorage.removeItem('employee');
    localStorage.removeItem('project');
    this.currentEmployeeSource.next(null);
  }
}
