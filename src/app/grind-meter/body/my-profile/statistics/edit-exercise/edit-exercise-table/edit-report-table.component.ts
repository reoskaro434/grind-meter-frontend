import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from "../../../../../../models/weight";
import {LiftExerciseReport} from "../../../../../../models/lift-exercise-report";
import {ExerciseReportApiCallerService} from "../../../../../../api-caller/exercise-report-api-caller.service";
import {ExerciseSet} from "../../../../../../models/exercise-set";

@Component({
  selector: 'app-edit-report-table',
  templateUrl: './edit-report-table.component.html',
  styleUrls: ['./edit-report-table.component.css']
})
export class EditReportTableComponent implements OnInit{
  @Input() report!: LiftExerciseReport | undefined;
  @Output() reportChange = new EventEmitter<LiftExerciseReport>();
  @Input() exerciseId!: string;


  get sets(): ExerciseSet[] {
    if (this.report === undefined) {
      return [];
    }
    return this.report.sets;
  }

  unsavedChanges: boolean = false;

  constructor(private exerciseReportApiCaller: ExerciseReportApiCallerService) {
  }

  ngOnInit() {
  }

  public saveReport() {
    const report = this.report;

    this.report = undefined;

    if (report === undefined) {
      return;
    }

    if (report.sets === undefined || report.sets.length === 0) {
      this.exerciseReportApiCaller.deleteReport(report.exerciseId, report.timestamp).subscribe(() => this.report = report);
      return;
    }

    for (let i = 0; i < report.sets.length; i++) {
      report.sets[i].index = i + 1;

      if (report.sets[i].repetitions === null) {
        report.sets[i].repetitions = 0;
      }
      if (report.sets[i].weight.mass === null) {
        report.sets[i].weight.mass = 0;
      }
    }

    this.exerciseReportApiCaller.saveLiftExerciseReport(report).subscribe(() => {
      this.unsavedChanges = false
      this.report = report;
      this.reportChange.emit(report);
    });
  }

  deleteSeries(set: ExerciseSet) {
    if (this.report === undefined) {
      return
    }

    this.report.sets.splice(this.report.sets.indexOf(set), 1);
    this.unsavedChanges = true;
  }

  addSeries() {
    if (this.report === undefined) {
      return
    }

    this.report.sets.push({
      weight: {mass: 0, unit: WeightUnit.Kilogram},
      repetitions: 0,
      index: this.report.sets.length
    });
    this.unsavedChanges = true;
  }

  onTableNumberChange() {
    this.unsavedChanges = true;
  }
}
