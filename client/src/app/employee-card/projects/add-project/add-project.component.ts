import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  form = this.fb.group({
    shortDescription: ['', Validators.required],
    longDescription: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }
}
