export enum WeightUnit {
  Kilogram = "KG",
  Pound = "LB"
}

export interface Weight {
  mass: number;
  unit: WeightUnit;
}
