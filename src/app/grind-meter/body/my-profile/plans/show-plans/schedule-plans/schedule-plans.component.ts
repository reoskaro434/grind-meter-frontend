import {Component, Input} from '@angular/core';
import {Account} from "../../../../../../models/account";
import {Plan} from "../../../../../../models/plan";
import {AccountApiCallerService} from "../../../../../../api-caller/account-api-caller.service";
import {debounce} from "lodash";

@Component({
  selector: 'app-schedule-plans',
  templateUrl: './schedule-plans.component.html',
  styleUrls: ['./schedule-plans.component.css']
})
export class SchedulePlansComponent {
  _plans: Plan[] = [];

  fridayPlan: Plan | undefined;
  mondayPlan: Plan | undefined;
  saturdayPlan: Plan | undefined;
  sundayPlan: Plan | undefined;
  thursdayPlan: Plan | undefined;
  tuesdayPlan: Plan | undefined;
  wednesdayPlan: Plan | undefined;

  account: Account = {
    userId: "",
    friday: "",
    monday: "",
    saturday: "",
    sunday: "",
    thursday: "",
    tuesday: "",
    wednesday: ""
  }

  loaded: boolean = false;

  debouncedAccountSave = debounce(this.updateAccount, 1000);

  constructor(private accountApiCaller: AccountApiCallerService) {}

  @Input()
  set plans(plans: Plan[]) {
    this._plans = plans;
  }
  ngOnInit(): void {
    this.accountApiCaller.getAccount().subscribe(account => {
      this.account = account;

      this.fridayPlan = this._plans.find(plan => plan.id === this.account.friday);
      this.mondayPlan = this._plans.find(plan => plan.id === this.account.monday);
      this.saturdayPlan = this._plans.find(plan => plan.id === this.account.saturday);
      this.sundayPlan = this._plans.find(plan => plan.id === this.account.sunday);
      this.thursdayPlan = this._plans.find(plan => plan.id === this.account.thursday);
      this.tuesdayPlan = this._plans.find(plan => plan.id === this.account.tuesday);
      this.wednesdayPlan = this._plans.find(plan => plan.id === this.account.wednesday);

      this.loaded = true;
    });
  }

  private updateAccount() {
    this.accountApiCaller.updateAccount(this.account).subscribe();
  }
  onSundayScheduleChange(plan?: Plan) {
    if (plan) {
      this.account.sunday = plan.id;
    } else {
      this.account.sunday = "";
    }

    this.debouncedAccountSave();
  }

  onSaturdayScheduleChange(plan?: Plan) {
    if (plan) {
      this.account.saturday = plan.id;
    } else {
      this.account.saturday = "";
    }

    this.debouncedAccountSave();
  }

  onFridayScheduleChange(plan?: Plan) {
    if (plan) {
      this.account.friday = plan.id;
    } else {
      this.account.friday = "";
    }

    this.debouncedAccountSave();
  }

  onThursdayScheduleChange(plan?: Plan) {
    if (plan) {
      this.account.thursday = plan.id;
    } else {
      this.account.thursday = "";
    }

    this.debouncedAccountSave();
  }

  onWednesdayScheduleChange(plan?: Plan) {
    if (plan) {
      this.account.wednesday = plan.id;
    } else {
      this.account.wednesday = "";
    }

    this.debouncedAccountSave();
  }

  onTuesdayScheduleChange(plan?: Plan) {
    if (plan) {
      this.account.tuesday = plan.id;
    } else {
      this.account.tuesday = "";
    }

    this.debouncedAccountSave();
  }

  onMondayScheduleChange(plan?: Plan) {
    if (plan) {
      this.account.monday = plan.id;
    } else {
      this.account.monday = "";
    }

    this.debouncedAccountSave();
  }
}
