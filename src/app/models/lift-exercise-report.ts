import {Exercise} from "./exercise";
import {ExerciseSet} from "./exercise-set";

export interface LiftExerciseReport {
  exercise: Exercise
  sets: ExerciseSet[];
  timestamp: number;
}
