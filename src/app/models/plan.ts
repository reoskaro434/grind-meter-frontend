

export enum PlanState {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
export interface Plan {
  id: string,
  name: string
  state: PlanState;
}
