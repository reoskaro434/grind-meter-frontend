import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExercisesApiCallerService {

  constructor(private http: HttpClient) {
  }

  public getDailyExercises() {
    return this.http.get<{payload:{ exercises: any }}>(`${environment.apiURL}/daily-exercises`);
  }
}
