import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccessApiCallerService} from "../../../api-caller/access-api-caller.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  inputEmail: any;
  inputUsername: any;
  inputPassword: any;
  inputRepeatPassword: any;

  constructor(private accessApiCaller: AccessApiCallerService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accessApiCaller.signUp({
      email: this.inputEmail,
      password: this.inputPassword,
      username: this.inputUsername
    }).subscribe(
      (response) => {
        if (response.success)
          this.router.navigate(["/verify-account", this.inputUsername]);
      });
  }

  passwordMatch() {
    return this.inputRepeatPassword === this.inputPassword;
  }
}
