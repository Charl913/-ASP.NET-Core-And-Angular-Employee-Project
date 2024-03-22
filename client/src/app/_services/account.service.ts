import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Employee } from '../_models/employee';
import { Education, Experience } from '../_models/edit-user-profile';
import { URLS } from '../environments/urls.environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentEmployeeSource = new BehaviorSubject<Employee | null>(null);
  currentEmployee$ = this.currentEmployeeSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<Employee>(URLS.accountURL + 'login', model).pipe(
      map((response: Employee) => {
        const employee = response;
        if (employee) {
          this.setCurrentUser(employee);
        }
      })
    );
  }

  register(value: any) {
    return this.http.post<Employee>(URLS.adminURL + 'register', value).pipe(
      map(employee => {
        return employee;
      })
    );
  }

  addEvent(value: any) {
    return this.http.post<Event>(URLS.adminURL + 'add-event', value).pipe(
      map(userEvent => {
        return userEvent;
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

  saveEducation(value: any) {
    return this.http.post<Education>(URLS.accountURL + 'add-education', value);
  }

  saveExperience(value: any) {
    return this.http.post<Experience>(URLS.accountURL + 'https://localhost:5001/api/account/add-experience', value);
  }
}
