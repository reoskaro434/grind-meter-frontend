import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Plan} from "../models/plan";
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

  public updatePlan(plan: Plan) {
    return this.http.post<{}>(`${environment.apiURL}/plan/update`, plan);
  }

  public deletePlan(planId: string) {
    return this.http.delete<{}>(`${environment.apiURL}/plan/delete/${planId}`);
  }

  public getPlans() {
    return this.http.get<Plan[]>(`${environment.apiURL}/plan/get-plans`);
  }

  public getExercises(planId: string) {
    return this.http.get<Exercise[]>(`${environment.apiURL}/plan/get-exercises/${planId}`);
  }

  public getPlan(planId: string) {
    return this.http.get<Plan>(`${environment.apiURL}/plan/get-plan/${planId}`);
  }
}
