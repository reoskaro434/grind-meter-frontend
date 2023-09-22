import {BasicExerciseData} from "./basic-exercise-data";

export interface FinishedExerciseData extends BasicExerciseData{
  series: number,
  weightArr: ({value: number})[],
  repetitionsArr: ({value: number})[];
  finishTime: number;
}
