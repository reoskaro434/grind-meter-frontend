import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Exercise} from "../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseApiCallerService {

  constructor(private http: HttpClient) {
  }

  public addExercise(exercise: Exercise) {
    return this.http.post<{}>(`${environment.apiURL}/exercise/add-exercise`, exercise);
  }

  deleteExercise(exercise_id: string) {
    return this.http.delete<{}>(`${environment.apiURL}/exercise/delete/${exercise_id}`);
  }

  public getExercisesForAccount() {
    return this.http.get<Exercise[]>(`${environment.apiURL}/exercise/get-exercises`);
  }

  public updateExercise(exercise: Exercise) {
    return this.http.post<{}>(`${environment.apiURL}/exercise/update`, exercise);
  }

  public getExerciseById(exercise_id: string) {
    return this.http.get<Exercise>(`${environment.apiURL}/exercise/get-exercise/${exercise_id}`);
  }
}
