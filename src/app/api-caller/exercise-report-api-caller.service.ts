import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LiftExerciseReport} from "../models/lift-exercise-report";

@Injectable({
  providedIn: 'root'
})
export class ExerciseReportApiCallerService {

  constructor(private http: HttpClient) {}

  public saveLiftExerciseReport(liftExerciseReport: LiftExerciseReport) {
    return this.http.post(
      `${environment.apiURL}/exercise-report/add-lift-report`,
      {"lift_exercise_report": liftExerciseReport});
  }
}
