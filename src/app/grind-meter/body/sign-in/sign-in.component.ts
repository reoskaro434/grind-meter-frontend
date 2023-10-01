import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AccessApiCallerService} from "../../../api-caller/access-api-caller.service";
import {ToastService} from "../../../services/toast.service";
import {ToastType} from "../../../enums/toast-type";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  inputUsername: any;
  inputPassword: any;

  constructor(private accessApiCaller: AccessApiCallerService,
              private auth: AuthService,
              private router: Router,
              private toast: ToastService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accessApiCaller.signIn({
      username: this.inputUsername,
      password: this.inputPassword
    }).subscribe(
      (response) => {
        this.auth.setAuthorization(response.payload.accessToken);
        this.router.navigate(["/my-profile"]).then(() => window.location.reload());
      }, () => {
        this.toast.showMessage("Could not sign in, check credentials..", ToastType.ERROR);
      });
  }
}
