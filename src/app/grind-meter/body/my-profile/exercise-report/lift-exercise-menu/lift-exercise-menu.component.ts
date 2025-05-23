import {Component, Input} from '@angular/core';
import {Exercise} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {WeightUnit} from "../../../../../models/weight";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {LocalStorageService} from "../../../../../services/local-storage.service";
import {debounce} from "lodash";
import {ExerciseSet} from "../../../../../models/exercise-set";

@Component({
  selector: 'app-lift-exercise-menu',
  templateUrl: './lift-exercise-menu.component.html',
  styleUrls: ['./lift-exercise-menu.component.css']
})
export class LiftExerciseMenuComponent  {
  currentExercise!: Exercise;
  currentReport!: LiftExerciseReport;
  lastReport!: LiftExerciseReport;
  loaded = false;
  debouncedReportSave = debounce(this.saveReport, 1000);

  constructor(private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private localStorage: LocalStorageService) {
  }

  @Input()
  set exercise(exercise: Exercise) {
    this.currentExercise = exercise;
    this.currentReport = this.localStorage.getForToday(`${exercise.id}_currentReport`);
    this.lastReport = this.localStorage.getForToday(`${exercise.id}_lastReport`);

    if (this.currentReport === undefined) {
      this.getLastExerciseReport(exercise.id);
    } else {
      this.loaded = true;
    }
  }

  private getLastExerciseReport(exerciseId: string) {
    this.exerciseReportApiCaller.getLastReport(exerciseId, 2).subscribe((lastReportList) => {
        for (let i = 0; i < lastReportList.length; i++) {
          if (lastReportList[i].timestamp === this.getCurrentTimestamp()) {
            this.currentReport = lastReportList[i];
          } else {
            this.lastReport = lastReportList[i];
            break;
          }
        }

        if (this.currentReport === undefined)
          this.addSeries();

        if (this.lastReport)
          this.localStorage.saveForToday(`${this.currentExercise.id}_lastReport`, this.lastReport);
        this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`, this.currentReport);
        this.loaded = true;
      });
  }


  public saveReport() {
    if (this.currentReport.sets.length === 0) {
      this.exerciseReportApiCaller
        .deleteReport(this.currentReport.exerciseId, this.currentReport.timestamp)
        .subscribe(() => this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`, this.currentReport));

      return;
    }


    for (let i = 0; i < this.currentReport.sets.length; i++) {
      this.currentReport.sets[i].index = i + 1;

      if (this.currentReport.sets[i].repetitions === null) {
        this.currentReport.sets[i].repetitions = 0;
      }
      if (this.currentReport.sets[i].weight.mass === null) {
        this.currentReport.sets[i].weight.mass = 0;
      }
    }

    this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`, this.currentReport);
    this.exerciseReportApiCaller.saveLiftExerciseReport(this.currentReport).subscribe();
  }

  deleteSeries(set: ExerciseSet) {
    if (this.currentReport === undefined) {
      return
    }

    this.currentReport.sets.splice(this.currentReport.sets.indexOf(set), 1);
    this.debouncedReportSave();
  }

  addSeries() {
    if (this.currentReport === undefined)
      this.currentReport = {
        reportId: '',
        exerciseId: this.currentExercise.id,
        sets: [],
        timestamp: this.getCurrentTimestamp()
      }

    this.currentReport.sets.push({
      weight: {mass: 0, unit: WeightUnit.Kilogram},
      repetitions: 0,
      index: this.currentReport.sets.length
    });
  }

  private getCurrentTimestamp() {
    return new Date().setHours(0, 0, 0, 0);
  }

  onTableNumberChange() {
    this.debouncedReportSave();
  }
}
