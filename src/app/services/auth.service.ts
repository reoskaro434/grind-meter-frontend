import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string = "";

  constructor(private cookie: CookieService) {
  }

  public setAuthorization(value: string) {
    this.accessToken = value;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public getUsername() {
    if (this.cookie.check("username"))
      return atob(this.cookie.get("username"));
    return "";
  }

  public cleanAuthorization() {
    this.cookie.delete("username","/", ".perfect-projects.link", true, "None");
    this.accessToken = "";
  }
}
