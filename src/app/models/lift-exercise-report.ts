import {ExerciseSet} from "./exercise-set";

export interface LiftExerciseReport {
  reportId: string;
  exerciseId: string;
  sets: ExerciseSet[];
  timestamp: number;
}
