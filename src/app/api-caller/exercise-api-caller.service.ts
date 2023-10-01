import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Exercise} from "../models/exercise";
import {NewExercise} from "../models/new-exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseApiCallerService {

  constructor(private http: HttpClient) {
  }

  public addExercise(exercise: NewExercise) {
    return this.http.post<{}>(`${environment.apiURL}/user-exercise/add-exercise`, exercise);
  }

  public getExercisePage(page: number) {
    return this.http.get<Exercise[]>(`${environment.apiURL}/user-exercise/get-exercise/${page}`);
  }
}
