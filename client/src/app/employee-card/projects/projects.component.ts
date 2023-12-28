import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../_models/project';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/_models/employee';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/employeeprojects';
  Active: Project[] = [];
  Finished: Project[] = [];
  projects: Project[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe({
      next: response => {
        const data = JSON.parse(JSON.stringify(response));
        this.projects = data;
        if (this.projects) {
          return this.setUserProjects();
        }
        return;
      },
      error: error => console.log(error)
    });

  }

  drop(event: CdkDragDrop<Project[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    if (this.Active[event.currentIndex] && this.Active[event.currentIndex].isActive === false) {
      this.Active[event.currentIndex].isActive = true;
      this.Active.indexOf(this.Active[event.currentIndex]);
    }

    if (this.Finished[event.currentIndex] && this.Finished[event.currentIndex].isActive === true) {
      this.Finished[event.currentIndex].isActive = false;
      this.Finished.indexOf(this.Finished[event.currentIndex]);
    }
  }

  save() {
    console.log('Active', this.Active)
    console.log('Finished', this.Finished)
  }

  projectActive() {
    this.Active = this.projects.filter(item => item.isActive === true)
    return this.Active;
  }

  projectFinished() {
    this.Finished = this.projects.filter(item => item.isActive === false)
    return this.Finished;
  }

  viewProjectActive(index: number) {
    if (this.Active !== null) {
      const projectActive = this.Active[index];
      localStorage.setItem('project', JSON.stringify(projectActive));
    }
  }

  viewProjectFinished(index: number) {
    const dataFinished = this.Finished
    if (dataFinished !== null) {
      const projectFinished = this.Finished[index];
      localStorage.setItem('project', JSON.stringify(projectFinished));
    }
  }

  setUserProjects() {
    const employee = localStorage.getItem('employees')
    if(!employee) return;
    const employeeProjects: Employee = JSON.parse(employee)
    console.log(employeeProjects.id)
    const projects = this.projects.filter(item => employeeProjects.id === item.employeeId)
    this.projects = projects;
    if(projects) {
      this.projectActive();
      this.projectFinished();
      return projects;
    }
    else{
      return;
    }
  }
}
