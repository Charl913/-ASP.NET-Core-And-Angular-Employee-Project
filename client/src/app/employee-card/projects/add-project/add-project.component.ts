import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  form: any;
  baseUrl = 'https://localhost:5001/api/employees/';
  employeeId: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private projectService: ProjectService, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['data']
    })
    console.log(this.employeeId)
    this.form = this.fb.group({
      employeeId: [this.employeeId],
      projectTitle: ['', Validators.required],
      projectRequirements: ['', Validators.required],
      projectCode: ['https://github.com/Charl913/', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  addProject() {
    const value = { ...this.form.value }
    this.projectService.addProject(value).subscribe({
      next: _ => {
        this.router.navigate(['employees/projects'], { queryParams: { data: this.employeeId } })
      },
      error: error => console.log(error)
    })
  }
}
