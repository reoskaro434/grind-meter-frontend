import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {ToastService} from "./toast.service";
import {ToastType} from "../enums/toast-type";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router: Router,
              private toast: ToastService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.getUsername() !== "") {
      return true;
    } else {
      this.router.navigate(["/sign-in"]).then(() => {
        this.toast.showMessage("Please sign in to gain access to these resources", ToastType.ERROR);
      });
      return false;
    }
  }
}
