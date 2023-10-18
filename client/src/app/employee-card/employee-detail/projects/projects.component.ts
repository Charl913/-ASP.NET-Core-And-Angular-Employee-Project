import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Done, Todo } from '../../../project';
import { Project } from '../../../_models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  todo = Todo;

  done = Done;

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
}
