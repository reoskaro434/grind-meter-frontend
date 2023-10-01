import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AccessApiCallerService} from "../../api-caller/access-api-caller.service";
import {ToastService} from "../../services/toast.service";
import {ToastType} from "../../enums/toast-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username = this.auth.getUsername();
  constructor(private auth: AuthService,
              private accessApiCaller: AccessApiCallerService,
              private toast: ToastService,
              private router: Router) {
  }

  public onSignOut(){
    this.accessApiCaller.signOut().subscribe((response)=>{
        if (response){
          this.toast.showMessage("You were signed out", ToastType.INFO);
          this.auth.cleanAuthorization();
          this.router.navigate(["/"]).then();
        }
    });
  }

  isSigned(){
    return this.auth.getUsername() !== "";
  }
}
