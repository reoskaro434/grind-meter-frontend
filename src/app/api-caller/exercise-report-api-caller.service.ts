import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LiftExerciseReport} from "../models/lift-exercise-report";

@Injectable({
  providedIn: 'root'
})
export class ExerciseReportApiCallerService {

  constructor(private http: HttpClient) {
  }

  public saveLiftExerciseReport(liftExerciseReport: LiftExerciseReport) {
    return this.http.post(
      `${environment.apiURL}/exercise-report/add-lift-report`,
      liftExerciseReport);
  }

  public getLastReport(exercise_id: string) {
    return this.http.get<LiftExerciseReport>(
      `${environment.apiURL}/exercise-report/get-last-report/${exercise_id}`
    );
  }
}
