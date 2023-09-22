import {Component, Input, OnInit} from '@angular/core';
import {BasicExerciseData} from "../../../../models/basic-exercise-data";
import {FinishedExerciseData} from "../../../../models/finished-exercise-data";

@Component({
  selector: 'app-update-exercise-menu',
  templateUrl: './update-exercise-menu.component.html',
  styleUrls: ['./update-exercise-menu.component.css']
})
export class UpdateExerciseMenuComponent implements OnInit{
  @Input() exercise!: BasicExerciseData;

  inputSeries?: number;
  inputRepetitionsArray: ({value: number|null})[] = [];
  inputWeightArray: ({value: number|null})[] = [];

  ngOnInit() {

  }

  onSubmit() {
    // TODO save to db...

    const filteredRepArr: ({value: number})[] = this.inputRepetitionsArray
      .filter((rep) => rep.value !== null) as ({value: number})[];

    const filteredWeightArr: ({value: number})[] = this.inputWeightArray
      .filter((rep) => rep !== null) as ({value: number})[];

    if (this.inputSeries && filteredRepArr.length === this.inputSeries && filteredWeightArr.length === this.inputSeries) {
    const finishedExercise: FinishedExerciseData = {
      ...this.exercise,
      ...{
        series: this.inputSeries,
        repetitionsArr: filteredRepArr,
        weightArr: filteredWeightArr,
        finishTime: Math.floor(Date.now() / 1000)
      }
    }
      console.log(finishedExercise);
    }
  }

  updateRepetitionsArray(inputSeries: number) {
    const currentLength = this.inputRepetitionsArray.length

    if(currentLength === inputSeries)
      return;

    if(currentLength > inputSeries) {
      this.inputRepetitionsArray.splice(-(currentLength-inputSeries));
      this.inputWeightArray.splice(-(currentLength-inputSeries));

      return;
    }

    if(currentLength < inputSeries) {
      for (let i = 0; i < inputSeries - currentLength; i++) {
        this.inputRepetitionsArray.push({value: null});
        this.inputWeightArray.push({value: null});
      }

      return;
    }
  }
}
