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
  updatePlan(plan: Plan) {
    return this.http.post<{}>(`${environment.apiURL}/plan/update`, plan);
  }

  public getPlansForAccount() {
    return this.http.get<Plan[]>(`${environment.apiURL}/plan/get-plans`);
  }

  public saveExercises(saveExercises: SaveExercisesModel) {
    return this.http.post<{}>(`${environment.apiURL}/plan/save-exercises`, saveExercises);
  }

  public getExercises(planId: string) {
    return this.http.get<Exercise[]>(`${environment.apiURL}/plan/get-exercises/${planId}`);
  }

  public getPlan(planId: string) {
    return this.http.get<Plan>(`${environment.apiURL}/plan/get-plan/${planId}`);
  }

  public getExercisesId(planId: string) {
    return this.http.get<string[]>(`${environment.apiURL}/plan/get-exercises-id/${planId}`);
  }
}
