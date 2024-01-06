import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../_models/project';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/_models/employee';
import { ProjectService } from 'src/app/_services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/_services/employee.service';

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
  employeeId: any;
  employee: Employee = {} as Employee;
  id: any;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private projectService: ProjectService) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['data']
    })

    this.employeeService.getEmployeeDetails(this.employeeId).subscribe({
      next: res => {
        this.employee = JSON.parse(JSON.stringify(res))
      }
    });

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

  ngOnInit(): void {
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
    this.projectService.saveProjectState(this.Active).subscribe();
    this.projectService.saveProjectState(this.Finished).subscribe();
    alert('Project Saved');
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
    const projects = this.projects.filter(item => this.employee.id === item.employeeId)
    this.projects = projects;
    if (projects) {
      this.projectActive();
      this.projectFinished();
      return projects;
    }
    else {
      return;
    }
  }

  addProject() {
    this.router.navigate(['employees/projects/add-project'], { queryParams: { data: this.employeeId } })
  }
}
