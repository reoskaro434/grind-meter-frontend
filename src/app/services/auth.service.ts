import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";

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
    const keyValue = "username";

    if (this.cookie.check(keyValue)) {
      const cookie = this.cookie.get(keyValue).replace(/["']/g, ""); // Replace quote cause sometimes cookie is set with it (fastapi version bug?)

      return atob(cookie);
    }

    return "";
  }

  public cleanAuthorization() {
    this.cookie.delete("username","/", environment.domain, true, "None");
    this.cookie.delete("refreshToken","/", environment.apiDomain, true, "Strict");
    this.accessToken = "";
  }
}
