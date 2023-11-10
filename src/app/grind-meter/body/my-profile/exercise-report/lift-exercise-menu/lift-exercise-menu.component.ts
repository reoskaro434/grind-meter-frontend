import {Component, Input, OnInit} from '@angular/core';
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
export class LiftExerciseMenuComponent implements OnInit{
  @Input() exercise!: Exercise;

  liftExerciseReport: LiftExerciseReport | undefined;
  inputSets: number = 0;
  repetitionsRegex: RegExp = /^\d+$/;
  weightRegex: RegExp = /^\d+(\.\d+)?$/;

  constructor(private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private toast: ToastService) {
  }
  ngOnInit() {
   this.liftExerciseReport= {
      exercise: this.exercise,
      sets: [],
      timestamp: new Date().setHours(0,0,0,0)
    };
   this.liftExerciseReport.exercise = this.exercise;

   this.exerciseReportApiCaller.getLastReport(this.exercise.id).pipe(map((report) => {
        if (report != null) {
          this.inputSets = report.sets.length;
          this.liftExerciseReport!.sets = report.sets;
        }
     }),
     catchError(err => {
       throw err;
     })).subscribe();

   this.updateExerciseArrays(this.liftExerciseReport.sets.length);
  }

  onSubmit() {
    if (!this.liftExerciseReport) {
      this.toast.showMessage("Could not prepare report!", ToastType.ERROR);
      return;
    }

    this.toast.showMessage("Sending report...", ToastType.INFO);
    this.exerciseReportApiCaller.saveLiftExerciseReport(this.liftExerciseReport)
      .pipe(map((response) => {
          this.toast.showMessage("Report saved!", ToastType.SUCCESS);
        }),
      catchError(err => {
        this.toast.showMessage("Could not save the report!", ToastType.ERROR);
        throw err;
      })).subscribe();
  }

  updateExerciseArrays(inputSeries: number) {
    if (!this.liftExerciseReport) {
      return;
    }
    const currentLength = this.liftExerciseReport.sets.length;

    if(currentLength > inputSeries) {
      this.liftExerciseReport.sets.splice(-(currentLength-inputSeries));
    }

    if(currentLength < inputSeries) {
      const missingFields = inputSeries - currentLength;
      for (let i = 0; i < missingFields; i++) {
        this.liftExerciseReport.sets.push({
          repetitions: null as any,
          weight: {unit: WeightUnit.Kilogram, mass: null as any},
          index: this.liftExerciseReport.sets.length + 1
        });
      }
    }
  }

  isInputRepetitionsValid(value: number){
    if (value) {
      return this.repetitionsRegex.test(String(value));
    }

    return false;
  }

  isInputWeightValid(value: number){
    if (value) {
      return this.weightRegex.test(String(value));
    }

    return false;
  }

  isReportValid() {
    if (!this.liftExerciseReport) {
      return;
    }
    const invalidSet = this.liftExerciseReport.sets.find(exerciseSet =>
      !this.isInputRepetitionsValid(exerciseSet.repetitions) || !this.isInputWeightValid(exerciseSet.weight.mass)
    );

    return (invalidSet === undefined && this.liftExerciseReport.sets.length > 0);
  }

  isButtonDisabled() {
    return !this.isReportValid();
  }

  updateTimestamp(timestamp: number) {
    this.liftExerciseReport!.timestamp = timestamp;
  }
}
