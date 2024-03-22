import { Component, OnInit } from '@angular/core';
import { faBook, faFolderOpen, faLink } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project = {} as Project;
  faLink = faLink;
  faFolderOpen = faFolderOpen;

  constructor() { }

  ngOnInit(): void {
    this.project = JSON.parse(localStorage.getItem('project')!);
  }
}
