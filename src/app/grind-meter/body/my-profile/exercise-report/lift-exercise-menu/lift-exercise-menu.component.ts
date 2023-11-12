import {Component, Input} from '@angular/core';
import {Exercise} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {WeightUnit} from "../../../../../models/weight";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {map} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastService} from "../../../../../services/toast.service";
import {ToastType} from "../../../../../enums/toast-type";

@Component({
  selector: 'app-lift-exercise-menu',
  templateUrl: './lift-exercise-menu.component.html',
  styleUrls: ['./lift-exercise-menu.component.css']
})
export class LiftExerciseMenuComponent {
  public currentExercise!: Exercise;

  currentReport: LiftExerciseReport | undefined;

  repetitionsRegex: RegExp = /^\d+$/;
  weightRegex: RegExp = /^\d+(\.\d+)?$/;

  constructor(private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private toast: ToastService) {
  }

  @Input()
  set exercise(exercise: Exercise) {
    this.currentExercise = exercise;
    this.currentReport = undefined;
    this.addSeries();
  }

  private getLastExerciseReport(exerciseId: string) {
    const currentReport = this.currentReport;
    this.currentReport = undefined;
    this.exerciseReportApiCaller.getLastReport(exerciseId).pipe(map((lastReport) => {
        if (lastReport) {
          this.currentReport = {
            sets: lastReport.sets,
            exercise: lastReport.exercise,
            timestamp: new Date().setHours(0,0,0,0)
          }
        }
        else {
          this.currentReport = currentReport;
        }
      }),
      catchError(err => {
        throw err;
      })).subscribe();
  }
  isInputRepetitionsValid(value: number | undefined) {
    if (value) {
      return this.repetitionsRegex.test(String(value));
    }

    return false;
  }

  isInputWeightValid(value: number | undefined) {
    if (value) {
      return this.weightRegex.test(String(value));
    }

    return false;
  }

  public getLastSavedReport() {
    this.getLastExerciseReport(this.currentExercise.id);
  }

  public saveReport() {
    if (!this.currentReport) {
      this.toast.showMessage("Could not prepare report!", ToastType.ERROR);
      return;
    }


    for (let i = 0; i < this.currentReport.sets.length; i++) {
      this.currentReport.sets[i].index = i + 1;

      if (!this.isInputRepetitionsValid(this.currentReport.sets[i].repetitions)) {
        this.toast.showMessage(`${this.currentReport.sets[i].index} row invalid!`, ToastType.ERROR);
        return;
      }
      if (!this.isInputWeightValid(this.currentReport.sets[i].weight.mass)) {
        this.toast.showMessage(`${this.currentReport.sets[i].index} row invalid!`, ToastType.ERROR);
        return;
      }
    }

    const currentReport = this.currentReport;

    this.currentReport = undefined;

    this.exerciseReportApiCaller.saveLiftExerciseReport(currentReport)
      .pipe(map((response) => {
          this.toast.showMessage("saved", ToastType.SUCCESS);
          this.currentReport = currentReport;
        }),
        catchError(err => {
          this.toast.showMessage("Could not save the report!", ToastType.ERROR);
          this.currentReport = currentReport;
          throw err;
        })).subscribe();
  }
  deleteSeries(index: number) {
    this.currentReport?.sets.splice(index, 1);
  }

  addSeries() {
    if (this.currentReport === undefined)
      this.currentReport = {
      exercise: this.currentExercise,
        sets: [],
        timestamp: new Date().setHours(0,0,0,0)
      }
    // @ts-ignore
    this.currentReport?.sets.push({weight: {mass:undefined, unit:WeightUnit.Kilogram}, repetitions: undefined, index: undefined})
  }
}
