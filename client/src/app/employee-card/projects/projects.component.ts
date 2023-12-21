import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Active, Finished } from '../../project';
import { Project } from '../../_models/project';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  Active = Active;
  Finished = Finished;

  constructor(private http: HttpClient, private router: Router) {

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
  }

  save() {
    alert('Coming soon')
  }

  setProjectActive(id: number) {
    const dataActive = this.Active
    if (dataActive !== null) {
      const project = dataActive.find((e: { projectId: number; }) => e.projectId === id);
      console.log(project)
      localStorage.setItem('project', JSON.stringify(project))
    }
  }

  setProjectFinished(id: number) {
    const dataFinished = this.Finished
    if (dataFinished !== null) {
      const project = dataFinished.find((e: { projectId: number; }) => e.projectId === id);
      console.log(project)
      localStorage.setItem('project', JSON.stringify(project))
    }
  }
}
