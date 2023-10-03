export enum ExerciseType {
  Lift = "LIFT"
}
export interface Exercise {
  id: string,
  name: string
  type: ExerciseType;
  isActive: boolean;
}
