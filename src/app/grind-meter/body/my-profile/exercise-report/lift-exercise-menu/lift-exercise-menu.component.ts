import {Component, Input} from '@angular/core';
import {Exercise} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {Weight, WeightUnit} from "../../../../../models/weight";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {map} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastService} from "../../../../../services/toast.service";
import {ToastType} from "../../../../../enums/toast-type";
import {ExerciseSet} from "../../../../../models/exercise-set";

@Component({
  selector: 'app-lift-exercise-menu',
  templateUrl: './lift-exercise-menu.component.html',
  styleUrls: ['./lift-exercise-menu.component.css']
})
export class LiftExerciseMenuComponent {
  public currentExercise!: Exercise;

  currentReport: LiftExerciseReport | undefined;
  lastReport: LiftExerciseReport | undefined;
  inputSets: number = 0;
  repetitionsRegex: RegExp = /^\d+$/;
  weightRegex: RegExp = /^\d+(\.\d+)?$/;

  constructor(private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private toast: ToastService) {
  }

  @Input()
  set exercise(exercise: Exercise) {
    this.currentReport = {
      exercise: exercise,
      sets: [{
        repetitions: 1,
        weight: {
          mass: 1,
          unit: WeightUnit.Kilogram
        },
        index: 1
      },
        {
          repetitions: 1,
          weight: {
            mass: 1,
            unit: WeightUnit.Kilogram
          },
          index: 1
        }],
      timestamp: new Date().setHours(0,0,0,0)
    };
    this.getLastExerciseReport(exercise.id);
    this.currentExercise = exercise;
  }

  private getLastExerciseReport(exerciseId: string) {
    this.exerciseReportApiCaller.getLastReport(exerciseId).pipe(map((report) => {
        if (report) {
          this.lastReport = report;
        }
      }),
      catchError(err => {
        throw err;
      })).subscribe();
  }

  onSubmit() {
    if (!this.currentReport) {
      this.toast.showMessage("Could not prepare report!", ToastType.ERROR);
      return;
    }

    this.toast.showMessage("Sending report...", ToastType.INFO);
    this.exerciseReportApiCaller.saveLiftExerciseReport(this.currentReport)
      .pipe(map((response) => {
          this.toast.showMessage("Report saved!", ToastType.SUCCESS);
        }),
        catchError(err => {
          this.toast.showMessage("Could not save the report!", ToastType.ERROR);
          throw err;
        })).subscribe();
  }

  isInputRepetitionsValid(value: number) {
    if (value) {
      return this.repetitionsRegex.test(String(value));
    }

    return false;
  }

  isInputWeightValid(value: number) {
    if (value) {
      return this.weightRegex.test(String(value));
    }

    return false;
  }

  isReportValid() {
    if (!this.currentReport) {
      return;
    }
    const invalidSet = this.currentReport.sets.find(exerciseSet =>
      !this.isInputRepetitionsValid(exerciseSet.repetitions) || !this.isInputWeightValid(exerciseSet.weight.mass)
    );

    return (invalidSet === undefined && this.currentReport.sets.length > 0);
  }

  isNextButtonDisabled () {
    return false;
  }
  updateTimestamp(timestamp: number) {
    this.currentReport!.timestamp = timestamp;
  }
}
