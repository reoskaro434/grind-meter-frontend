import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {Exercise} from "../../../../../models/exercise";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent {
  date: Date | undefined;
  exercise: Exercise | undefined;
  loaded: boolean = false;
  report!: LiftExerciseReport;
  report_list: LiftExerciseReport[] = [];
  forceUpdate: boolean = false;
  constructor(private route: ActivatedRoute,
              private exerciseApiCaller: ExerciseApiCallerService,
              private exerciseReportApiCaller: ExerciseReportApiCallerService) {
  }

  ngOnInit(): void {
    this.date = new Date();

    const exerciseId = this.route.snapshot.params['exerciseId'];

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const startEndTimestamps = this.getStartEndMonthTimestamps(currentMonth, currentYear);

    this.exerciseApiCaller.getExerciseById(exerciseId).subscribe(exercise => {
      this.exercise = exercise;

      this.loadNewReports(exerciseId, startEndTimestamps.start, startEndTimestamps.end);
    });
  }

  private loadNewReports(id: string, start: number, end: number) {
    this.exerciseReportApiCaller.getReportsFromRange(id, start, end)
      .subscribe((report_list) => {
        this.report_list = report_list;
        this.updateReportProperty();

        this.loaded = true;
        this.forceUpdate = !this.forceUpdate;
      });
  }

  private getStartEndMonthTimestamps(month: number, year: number): { start: number; end: number } {
    // Adjust month to be 0-indexed
    const adjustedMonth = month - 1;

    const startTimestamp = new Date(year, adjustedMonth, 1).getTime();
    const endTimestamp = new Date(year, adjustedMonth + 1, 0).getTime();

    return {
      start: startTimestamp,
      end: endTimestamp
    };
  }

  private updateReportProperty() {
    if (this.date === undefined || this.exercise === undefined) {
      return;
    }
    const selectedTimestamp: number = this.date.setHours(0, 0, 0, 0);

    const report = this.report_list.find(report => report.timestamp === selectedTimestamp);

    if (report) {
      this.report = report;
    } else {
      this.report = {
        exerciseId: this.exercise!.id,
        reportId: '',
        timestamp: selectedTimestamp,
        sets: []
      };
    }
  }

  dateSelected() {
    this.updateReportProperty();
  }

  monthChanged(data: any) { // data: { month: number, year: number }
    const startEndTimestamps = this.getStartEndMonthTimestamps(data.month, data.year);

    if (this.exercise) {
      this.loadNewReports(this.exercise.id, startEndTimestamps.start, startEndTimestamps.end);
    }
  }

  isSpecialDate(date: any, _: boolean, report: any) { // _: boolean is required for updating the calendar
    const dateStartOfDay = new Date(date.year, date.month, date.day).setHours(0, 0, 0, 0);

    return this.report_list.some(report => report.timestamp === dateStartOfDay);
  }
}
