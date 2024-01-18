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

  public getLastReport(exercise_id: string, count: number) {
    return this.http.get<LiftExerciseReport[]>(
      `${environment.apiURL}/exercise-report/get-last-report/${exercise_id}/${count}`
    );
  }
  public getReports(exercise_id: string, page: number) {
    return this.http.get<LiftExerciseReport[]>(
      `${environment.apiURL}/exercise-report/get-reports/${exercise_id}/${page}`
    );
  }

  getReportsFromRange(exerciseId: string, start: number, end: number) {
    return this.http.get<LiftExerciseReport[]>(
      `${environment.apiURL}/exercise-report/get-reports-from-range/${exerciseId}/${start}/${end}`
    );
  }

  deleteReport(exercise_id: string, timestamp: number) {
    return this.http.delete(
      `${environment.apiURL}/exercise-report/delete-report/${exercise_id}/${timestamp}`
    );
  }

  public getCsvReport(exerciseId: string, start: number, end: number) {
    return this.http.get<any>(
      `${environment.apiURL}/exercise-report/download-csv-report/${exerciseId}/${start}/${end}`,
      {
        responseType: 'blob' as 'json'
      }
    );
  }
}
