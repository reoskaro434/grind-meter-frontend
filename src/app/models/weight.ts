import {Exercise} from "./exercise";

export enum WeightUnit {
  Kilogram = "kg",
  Pound = "lb"
}

export interface Weight {
  mass: number;
  unit: WeightUnit;
}
