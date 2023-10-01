export enum ExerciseType {
  Lift = "lift"
}
export interface Exercise {
  id: string,
  name: string
  type: ExerciseType;
}
