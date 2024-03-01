import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { Event } from 'src/app/_models/event';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-upcomming-events',
  templateUrl: './upcomming-events.component.html',
  styleUrls: ['./upcomming-events.component.css']
})
export class UpcommingEventsComponent implements OnInit{
  events: Event[] = []

  currentUser: Employee = {} as Employee

  constructor(private http: HttpClient, private accountService: AccountService){}

  ngOnInit(): void {
    this.accountService.currentEmployee$.subscribe({
      next: res =>{
        if (res){
          this.currentUser = res;
        }
      }
    })

    this.http.get('https://localhost:5001/api/employeeevent').subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.events = data;
        return data;
      },
      error: err => console.log(err)
    });
  }
}
