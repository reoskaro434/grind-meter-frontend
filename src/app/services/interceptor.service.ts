import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {AccessApiCallerService} from "../api-caller/access-api-caller.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private readonly excludedUrls = [
    `${environment.apiURL}/access/refresh-token`,
    `${environment.apiURL}/access/sign-in`,
    `${environment.apiURL}/access/sign-up`,
    `${environment.apiURL}/access/verify-account`,
    `${environment.apiURL}/projects`,
    `${environment.apiURL}/scores/get-scores`,
  ];

  constructor(private accessApiCaller: AccessApiCallerService,
              private auth: AuthService,
              private router: Router) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.excludedUrls.includes(request.url) || this.auth.getUsername() === "") {
      return next.handle(request);
    }
    if (this.auth.getAccessToken() === "") {
      return this.handle401Error(request, next);
    }
    request = this.injectAccessToken(request);
    return next.handle(request).pipe(catchError(error => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.accessApiCaller.refreshToken(this.auth.getUsername()).pipe(
      switchMap((response: any) => {
        this.auth.setAuthorization(response.payload.accessToken);
        request = this.injectAccessToken(request);
        return next.handle(request);
      }),
      catchError(error => {
        this.auth.cleanAuthorization();
        this.router.navigate(["/"]);
        return throwError(error);
      }));
  }

  private injectAccessToken(request: HttpRequest<any>) {
    return request.clone({
      headers: request.headers.set('accessToken', this.auth.getAccessToken()),
    });
  }
}
