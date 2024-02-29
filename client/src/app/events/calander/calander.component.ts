import { Component } from '@angular/core';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent {
  displayDate = Date.now();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  currentDate = new Date().getDate();
  month: Date[] = [];
  rows: Date[][] = [];

  constructor() {
    this.month = this.getDaysInMonth(this.currentMonth, this.currentYear);
    this.rows = this.getRows(this.month);
  }

  isCurrentDate(date: Date): boolean {
    const currentDateDay = this.currentDate;
    return date.getDate() === currentDateDay;
  }

  getDaysInMonth(month: number, year: number): Date[] {
    const date = new Date(year, month, 1);
    const days: Date[] = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  getRows(month: Date[]): Date[][] {
    const rows: Date[][] = [];
    const rowSize = 7;

    for (let index = 0; index < month.length; index += rowSize) {
      rows.push(month.slice(index, index + rowSize));
    }

    return rows;
  }
}
