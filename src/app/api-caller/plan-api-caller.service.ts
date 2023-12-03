import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Plan} from "../models/plan";
import {SaveExercisesModel} from "../models/save-exercises";
import {Exercise} from "../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class PlanApiCallerService {

  constructor(private http: HttpClient) {
  }

  public addPlan(plan: Plan) {
    return this.http.post<{}>(`${environment.apiURL}/plan/add-plan`, plan);
  }

  public getPlansPage(page: number) {
    return this.http.get<Plan[]>(`${environment.apiURL}/plan/get-plans/${page}`);
  }

  public saveExercises(saveExercises: SaveExercisesModel) {
    return this.http.post<{}>(`${environment.apiURL}/plan/save-exercises`, saveExercises);
  }

  public setPlanActive(plan: Plan) {
    return this.http.post<{}>(`${environment.apiURL}/plan/set-plan-active`, plan);
  }

  public setPlanInActive(plan: Plan) {
    return this.http.post<{}>(`${environment.apiURL}/plan/set-plan-inactive`, plan);
  }

  public getExercises(planId: string) {
    return this.http.get<Exercise[]>(`${environment.apiURL}/plan/get-exercises/${planId}`);
  }

  public getExercisesId(planId: string) {
    return this.http.get<string[]>(`${environment.apiURL}/plan/get-exercises-id/${planId}`);
  }

  // public setExerciseInactive(id: string) {
  //   return this.http.post<{}>(`${environment.apiURL}/exercise/set-inactive`, {id: id});
  // }
  //
  // public getActiveExercises() {
  //   return this.http.get<Exercise[]>(`${environment.apiURL}/exercise/get-active-exercises`);
  // }
  //
  // public getExerciseById(exercise_id: string) {
  //   return this.http.get<Exercise>(`${environment.apiURL}/exercise/get-exercise/${exercise_id}`);
  // }
}
