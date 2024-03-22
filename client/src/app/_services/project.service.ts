import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_models/project';
import { map } from 'rxjs';
import { URLS } from '../environments/urls.environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  addProject(value: any) {
    return this.http.post<Project>(URLS.adminURL + 'add-project', value).pipe(
      map(project => {
        return project;
      })
    );   
  }

  saveProjectState(value: any) {
    return this.http.put<Project>(URLS.adminURL + 'save-project-state', value).pipe(
      map(project => {
        return project;
      })
    );
  }
}
