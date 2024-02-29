import { Component } from '@angular/core';

@Component({
  selector: 'app-upcomming-events',
  templateUrl: './upcomming-events.component.html',
  styleUrls: ['./upcomming-events.component.css']
})
export class UpcommingEventsComponent {
  events = [
    {name: 'Meeting', time: Date.now()},
    {name: 'Another Meeting', time: Date.now()},
    {name: 'Another Meeting', time: Date.now()}
  ]
}
