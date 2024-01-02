import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookie: CookieService) {
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
    this.cookie.delete("refreshToken","/", environment.domain, true, "Strict");
    this.cookie.delete("accessToken","/", environment.domain, true, "Strict");
  }
}
