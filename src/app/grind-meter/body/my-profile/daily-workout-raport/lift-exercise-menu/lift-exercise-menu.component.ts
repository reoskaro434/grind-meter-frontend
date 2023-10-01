import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {WeightUnit} from "../../../../../models/weight";
@Component({
  selector: 'app-lift-exercise-menu',
  templateUrl: './lift-exercise-menu.component.html',
  styleUrls: ['./lift-exercise-menu.component.css']
})
export class LiftExerciseMenuComponent implements OnInit{
  @Input() exercise!: Exercise;

  liftExerciseReport: LiftExerciseReport = {
    sets: [],
    exercise: this.exercise,
    timestamp: 0
  };
  inputSets: number = 0;

  disableSaveButton: boolean = true;

  repetitionsRegex: RegExp = /^\d+$/;
  weightRegex: RegExp = /^\d+(\.\d+)?$/;


  ngOnInit() {
   this.updateExerciseArrays(this.liftExerciseReport.sets.length);
  }

  onSubmit() {
    // TODO save to db...


    // console.log(liftExerciseReport); finishTime: Math.floor(Date.now() / 1000);
  }

  updateExerciseArrays(inputSeries: number) {
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
          index: i+1
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

  isButtonDisabled() {
    const invalidSet = this.liftExerciseReport.sets.find(exerciseSet =>
        !this.isInputRepetitionsValid(exerciseSet.repetitions) || !this.isInputWeightValid(exerciseSet.weight.mass)
    );

    return !(invalidSet === undefined && this.liftExerciseReport.sets.length > 0);
  }
}
