import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../services/toast.service";
import {AuthService} from "../../../services/auth.service";
import {ToastType} from "../../../enums/toast-type";
import {ActivatedRoute, Router} from "@angular/router";
import {AccessApiCallerService} from "../../../api-caller/access-api-caller.service";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  inputConfirmationCode: any;
  private username: string = "";

  constructor(private accessApiCaller: AccessApiCallerService,
              private toast: ToastService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const username = paramMap.get("username");
      if (username != null)
        this.username = username;});
  }

  onSubmit() {
    if (this.username !== "")
    this.accessApiCaller.sendCode(this.inputConfirmationCode, this.username)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(["/sign-in"]).then();
          this.toast.showMessage("Account verified!", ToastType.SUCCESS);
        }
      });
  }
}
