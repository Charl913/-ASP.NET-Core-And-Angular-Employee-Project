import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  currentEmployee: Employee = {} as Employee
  form: any;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) {
    const employeeData = localStorage.getItem('employees');
    if (employeeData) {
      this.currentEmployee = JSON.parse(employeeData);
    }
    this.form = this.fb.group({
      employeeId: [this.currentEmployee.id],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  addProject() {
    console.log('employeeId:', this.form.get('employeeId')?.value);
    console.log('the id:', this.currentEmployee.id)
    const value = { ...this.form.value }
    this.projectService.addProject(value).subscribe({
      next: _ => {
        this.router.navigateByUrl('employees/projects')
      },
      error: error => console.log(error)
    })  
    console.log(this.form.value)
  }
}
