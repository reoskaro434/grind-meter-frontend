import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AccountApiCallerService} from "../../../api-caller/account-api-caller.service";
import {Account} from "../../../models/account";
import {Plan} from "../../../models/plan";
import {PlanApiCallerService} from "../../../api-caller/plan-api-caller.service";

@Component({
  selector: 'app-project-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  username: string = ""
  loaded: boolean = false;
  day: string = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  account: Account | undefined;
  plan: Plan | undefined;
  constructor(private auth: AuthService,
              private router: Router,
              private accountApiCaller: AccountApiCallerService,
              private planApiCaller: PlanApiCallerService) {}

  ngOnInit(): void {
    this.accountApiCaller.getAccount().subscribe(account => {
      this.account = account;
      this.findTodayPlan(account);
      console.log(account);

    }, err => {
      this.router.navigate(['/sign-in']).then();
    });
    this.username = this.auth.getUsername()
  }

  private findTodayPlan(account: Account) {
    const dayPlans: any = {
      MONDAY: account.monday,
      TUESDAY: account.tuesday,
      WEDNESDAY: account.wednesday,
      THURSDAY: account.thursday,
      FRIDAY: account.friday,
      SATURDAY: account.saturday,
      SUNDAY: account.sunday
    };

    const planId = dayPlans[this.day.toUpperCase()];
    if (planId !== "") {

      this.planApiCaller.getPlan(planId).subscribe((plan: Plan) => {
        this.plan = plan
        this.loaded = true;
      });
    } else {
      this.loaded = true;
    }
  }

  public isWorkoutToday() {
    return this.plan !== undefined;
  }

  toToReportPage() {
    this.router.navigate(['/my-profile/plans/report', this.plan?.id]).then();
  }
}
