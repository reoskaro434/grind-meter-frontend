import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AccessApiCallerService} from "../../../../api-caller/access-api-caller.service";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private auth: AuthService,
              private accessApiCaller: AccessApiCallerService,
              private router: Router) {
  }
  onSignOut(signOutForm: NgForm) {
    this.accessApiCaller.signOut().subscribe((_) => {
      this.auth.cleanAuthorization();
      this.router.navigate(["/"]).then(() =>window.location.reload);
    });
  }

  onDeleteAccount(deleteAccountForm: NgForm) {
    console.log(deleteAccountForm);
  }
}
