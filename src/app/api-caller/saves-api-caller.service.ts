import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ScoresData} from "../models/scores-data";
import {SavesData} from "../models/saves-data";

@Injectable({
  providedIn: 'root'
})
export class SavesApiCallerService {

  constructor(private http: HttpClient) {
  }

  public saveProject(projectId: string) {
    return this.http.post<{success: boolean}>(
      `${environment.apiURL}/saves/save-project`,
      {"projectId": projectId});
  }

  public deleteSave(projectId: string) {
    return this.http.delete<{success: boolean}>(
      `${environment.apiURL}/saves/delete-saved-project`,
      {params: {projectId: projectId}});
  }

  public getSaveStatus(projectId: string) {
    return this.http.get<SavesData>(
      `${environment.apiURL}/saves/get-save-status`,
      {params: {projectId: projectId}});
  }

  public getSaveCount(projectId: string) {
    return this.http.get<SavesData>(
      `${environment.apiURL}/saves/get-saves`,
      {params: {projectId: projectId}});
  }
}
