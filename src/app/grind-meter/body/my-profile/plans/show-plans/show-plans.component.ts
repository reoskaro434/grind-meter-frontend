import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../../../services/toast.service";
import {map, of} from "rxjs";
import {ToastType} from "../../../../../enums/toast-type";
import {catchError} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {Plan, PlanState} from "../../../../../models/plan";

@Component({
  selector: 'app-plans',
  templateUrl: './show-plans.component.html',
  styleUrls: ['./show-plans.component.css']
})
export class ShowPlansComponent implements OnInit {
  plans: Plan[] = [];
  selectedPlan!: Plan;

  constructor(private plansApiCaller: PlanApiCallerService,
              private toast: ToastService,
              private router: Router,
              private route: ActivatedRoute)
  {}
  public ngOnInit(): void {
    this.plansApiCaller.getPlansPage(1).pipe(map((plans) => {
      for (const p of plans) {
        if (p.state == PlanState.Active)
          this.selectedPlan = p;
      }
      this.plans = plans;
    }), catchError(err => {
      this.toast.showMessage('No plans found!', ToastType.INFO);
      return of(err);
    })).subscribe(); //TODO pagination
  }

  onSelectionChange(plan: Plan) {
    for (const p of this.plans) {
      if (p.state == PlanState.Active && p.id !== plan.id)
        this.plansApiCaller.setPlanInActive(p).subscribe();
    }

    this.plansApiCaller.setPlanActive(plan).subscribe(success => this.toast.showMessage('Saved!', ToastType.INFO));
  }

  onEditPressed(plan: Plan) {
    this.router.navigate([`../edit/${plan.id}`], { relativeTo: this.route }).then();
  }

  onRenamePressed(plan: Plan) {

  }

  onDeletePressed(plan: Plan) {

  }

  onReportPressed(plan: Plan) {
    this.router.navigate([`../fill/${plan.id}`], { relativeTo: this.route }).then();
  }
}
