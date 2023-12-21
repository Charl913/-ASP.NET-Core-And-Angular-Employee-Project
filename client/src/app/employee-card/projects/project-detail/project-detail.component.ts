import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit{
  project: Project = {} as Project;

  ngOnInit(): void {
    this.project = JSON.parse(localStorage.getItem('project')!);
  }
}
