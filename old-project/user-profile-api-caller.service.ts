import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserProfileData} from "./user-profile-data";
import {environment} from "../src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserProfileApiCallerService {

  constructor(private http: HttpClient) {
  }

  public getProjects() {
    return this.http.get<UserProfileData>(
      `${environment.apiURL}/user-profile`);
  }

  public updateVisibility(projectId: string, visible: boolean) {
    return this.http.post<{ success: boolean }>(
      `${environment.apiURL}/user-profile/update-visibility`,
      {
        "projectId": projectId,
        "visible": visible
      });
  }

  public getSavedProjects() {
    return this.http.get<UserProfileData>(
      `${environment.apiURL}/user-profile/get-saved-projects`);
  }
}
