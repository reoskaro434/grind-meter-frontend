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
    return this.http.post<{}>(`${environment.apiURL}/user-exercise/add-exercise`, exercise);
  }

  public getExercisePage(page: number) {
    return this.http.get<Exercise[]>(`${environment.apiURL}/user-exercise/get-exercises/${page}`);
  }

  public setExerciseActive(id: string) {
    return this.http.post<{}>(`${environment.apiURL}/user-exercise/set-active`, {id: id});
  }

  public setExerciseInactive(id: string) {
    return this.http.post<{}>(`${environment.apiURL}/user-exercise/set-inactive`, {id: id});
  }

  public getActiveExercises() {
    return this.http.get<Exercise[]>(`${environment.apiURL}/user-exercise/get-active-exercises`);
  }
}
