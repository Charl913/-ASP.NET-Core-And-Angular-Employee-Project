import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_models/project';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) { }

  addProject(value: any) {
    return this.http.post<Project>(this.baseUrl + 'employeeprojects/add', value).pipe(
      map(project => {
        return project;
      })
    );   
  }
}
