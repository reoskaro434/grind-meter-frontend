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

  public getExercisesForAccount() {
    return this.http.get<Exercise[]>(`${environment.apiURL}/exercise/get-exercises`);
  }

  public updateExercise(exercise: Exercise) {
    return this.http.post<{}>(`${environment.apiURL}/exercise/update`, exercise);
  }
  public setExerciseActive(id: string) {
    return this.http.post<{}>(`${environment.apiURL}/exercise/set-active`, {id: id});
  }

  public setExerciseInactive(id: string) {
    return this.http.post<{}>(`${environment.apiURL}/exercise/set-inactive`, {id: id});
  }

  public getActiveExercises() {
    return this.http.get<Exercise[]>(`${environment.apiURL}/exercise/get-active-exercises`);
  }

  public getExerciseById(exercise_id: string) {
    return this.http.get<Exercise>(`${environment.apiURL}/exercise/get-exercise/${exercise_id}`);
  }
}
