import {ExerciseType} from "./exercise";

export interface NewExercise {
  id?: string,
  name: string
  type: ExerciseType;
}
