import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AccessApiCallerService} from "../../../api-caller/access-api-caller.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  inputUsername: any;
  inputPassword: any;

  constructor(private accessApiCaller: AccessApiCallerService,
              private auth: AuthService,
              private router: Router) {
  }
  onSubmit() {
    this.accessApiCaller.signIn({
      username: btoa(this.inputUsername),
      password: btoa(this.inputPassword)
    }).subscribe(
      (response) => {
        this.auth.setAuthorization(response.payload.accessToken);
        this.router.navigate([`/${this.inputUsername}/plans/show-plans`]).then(() => {
          window.location.reload();
        });
      });
  }
}
