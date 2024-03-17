import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from '../../_models/project';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/_models/employee';
import { ProjectService } from 'src/app/_services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/_services/employee.service';
import { faFloppyDisk, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/_services/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { URLS } from 'src/app/environments/urls.environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  Active: Project[] = [];
  Finished: Project[] = [];
  projects: Project[] = [];
  employeeId: any;
  employee: Employee = {} as Employee;
  faSquarePlus = faSquarePlus;
  faFloppyDisk = faFloppyDisk;
  currentEmployee: Employee = {} as Employee;
  modalRef?: BsModalRef;

  constructor(private accountService: AccountService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private projectService: ProjectService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['data'];
    });

    this.employeeService.getEmployeeDetails(this.employeeId).subscribe({
      next: res => {
        this.employee = JSON.parse(JSON.stringify(res));
      }
    });

    this.http.get(URLS.employeeProjectURL).subscribe({
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

    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if (res) {
          this.currentEmployee = res;
        }
      }
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
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
  }

  projectActive() {
    this.Active = this.projects.filter(item => item.isActive === true);
    return this.Active;
  }

  projectFinished() {
    this.Finished = this.projects.filter(item => item.isActive === false);
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
    const proj = this.projects.filter(item => this.employee.id == item.id)
    this.projects = proj;
    if (proj) {
      this.projectActive();
      this.projectFinished();
      return this.projects;
    }
    return;
  }

  addProject() {
    this.router.navigate(['employees/projects/add-project'], { queryParams: { data: this.employeeId } });
  }
}