export enum ExerciseType {
  Lift = "LIFT"
}

export enum ExerciseState {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
export interface Exercise {
  id: string,
  name: string
  type: ExerciseType;
  state: ExerciseState;
}
