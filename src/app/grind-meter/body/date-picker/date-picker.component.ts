import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit{
  @Output() selectedTimestamp = new EventEmitter<number>();
  date: Date = new Date();

  ngOnInit() {
    this.selectedTimestamp.emit(this.date.setHours(0,0,0,0))
  }

  getMaxDate(d: Date | null): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return d != null && d.getTime() <= today.getTime();
  };

  emitSelectedTimestamp(date: Date) {
    this.selectedTimestamp.emit(date.setHours(0,0,0,0))
  }
}
