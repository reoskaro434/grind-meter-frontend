import {Component, Input} from '@angular/core';
import {Exercise} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {WeightUnit} from "../../../../../models/weight";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {map} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastService} from "../../../../../services/toast.service";
import {ToastType} from "../../../../../enums/toast-type";
import {LocalStorageService} from "../../../../../services/local-storage.service";

@Component({
  selector: 'app-lift-exercise-menu',
  templateUrl: './lift-exercise-menu.component.html',
  styleUrls: ['./lift-exercise-menu.component.css']
})
export class LiftExerciseMenuComponent{
  public currentExercise!: Exercise;

  currentReport: LiftExerciseReport | undefined;
  lastReport: LiftExerciseReport | undefined;

  repetitionsRegex: RegExp = /^\d+$/;
  weightRegex: RegExp = /^\d+(\.\d+)?$/;
  isReportSaved: boolean = true;

  constructor(private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private toast: ToastService,
              private localStorage: LocalStorageService) {
  }

  @Input()
  set exercise(exercise: Exercise) {
    this.currentExercise = exercise;
    this.currentReport = this.localStorage.getForToday(`${exercise.id}_currentReport`);
    this.lastReport = this.localStorage.getForToday(`${exercise.id}_lastReport`);

    const isReportSaved = this.localStorage.getForToday(`${exercise.id}_isReportSaved`);

    if (isReportSaved !== undefined) {
      this.isReportSaved = isReportSaved;
    }


    if (this.currentReport === undefined) {
      this.getLastExerciseReport(exercise.id);
    }
  }

  private getLastExerciseReport(exerciseId: string) {
    this.exerciseReportApiCaller.getLastReport(exerciseId,2).pipe(map((lastReportList) => {
        for (let i = 0; i < lastReportList.length; i++) {
          if (lastReportList[i].timestamp === this.getCurrentTimestamp()) {
            this.currentReport = lastReportList[i];
          } else {
            this.lastReport = lastReportList[i];
            break;
          }
        }

        if (this.currentReport === undefined) {
          this.addSeries();
        }


        this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`,this.currentReport);
        if (this.lastReport)
          this.localStorage.saveForToday(`${this.currentExercise.id}_lastReport`, this.lastReport);
        this.localStorage.saveForToday(`${this.currentExercise.id}_isReportSaved`, this.isReportSaved);
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
  public onRepsChange(repetitions: number) {
    if (this.isInputRepetitionsValid(repetitions)) {
      this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`,this.currentReport);
      this.isReportSaved = false;
      this.localStorage.saveForToday(`${this.currentExercise.id}_isReportSaved`, this.isReportSaved);
    }
  }

  public onWeightChange(weight: number) {
    if (this.isInputWeightValid(weight)) {
      this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`,this.currentReport);
      this.isReportSaved = false;
      this.localStorage.saveForToday(`${this.currentExercise.id}_isReportSaved`, this.isReportSaved);
    }
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

    // this.currentReport = undefined;
    this.isReportSaved = true;
    this.exerciseReportApiCaller.saveLiftExerciseReport(currentReport)
      .pipe(map((response) => {
          this.currentReport = currentReport;
          this.localStorage.saveForToday(`${this.currentExercise.id}_isReportSaved`, this.isReportSaved);

        }),
        catchError(err => {
          this.isReportSaved = false;
          this.toast.showMessage("Could not save the report!", ToastType.ERROR);
          this.currentReport = currentReport;
          throw err;
        })).subscribe();
  }
  deleteSeries(index: number) {
    // const deletedSet = this.currentReport?.sets.splice(index, 1);
    this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`,this.currentReport);
    this.isReportSaved = false;
    this.localStorage.saveForToday(`${this.currentExercise.id}_isReportSaved`, this.isReportSaved);

  }

  addSeries() {
    if (this.currentReport === undefined)
      this.currentReport = {
      exercise: this.currentExercise,
        sets: [],
        timestamp: this.getCurrentTimestamp()
      }
    // @ts-ignore
    this.currentReport?.sets.push({weight: {mass:undefined, unit:WeightUnit.Kilogram}, repetitions: undefined, index: undefined})

    this.localStorage.saveForToday(`${this.currentExercise.id}_currentReport`,this.currentReport);
    this.isReportSaved = false;
    this.localStorage.saveForToday(`${this.currentExercise.id}_isReportSaved`, this.isReportSaved);

  }

  private getCurrentTimestamp() {
    return new Date().setHours(0,0,0,0);
  }
}
