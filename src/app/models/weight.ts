export enum WeightUnit {
  Kilogram = "kilogram"
  // Pound = "LB"
}

export interface Weight {
  mass: number;
  unit: WeightUnit;
}
