import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ScoresData} from "../models/scores-data";

@Injectable({
  providedIn: 'root'
})
export class ScoresApiCallerService {

  constructor(private http: HttpClient) {
  }

  public getScoresCount(projectId: string) {
    return this.http.get<ScoresData>(
      `${environment.apiURL}/scores/get-scores`,
      {params: {projectId: projectId}});
  }

  public addScore(projectId: string) {
    return this.http.post<{success: boolean}>(
      `${environment.apiURL}/scores/add-score`,
      {"projectId": projectId});
  }

  public deleteScore(projectId: string) {
    return this.http.delete<{success: boolean}>(
      `${environment.apiURL}/scores/delete-score`,
      {params: {projectId: projectId}});
  }

  public getScoredStatus(projectId: string) {
    return this.http.get<ScoresData>(
      `${environment.apiURL}/scores/get-scored-status`,
      {params: {projectId: projectId}});
  }
}
