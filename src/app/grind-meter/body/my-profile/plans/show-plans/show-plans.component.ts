import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {Plan} from "../../../../../models/plan";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-plans',
  templateUrl: './show-plans.component.html',
  styleUrls: ['./show-plans.component.css']
})
export class ShowPlansComponent implements OnInit {
  plans: Plan[] = [];
  plansTree: TreeNode[] = [];
  plansLoaded: boolean = false;

  constructor(private plansApiCaller: PlanApiCallerService,
              private router: Router,
              private route: ActivatedRoute)
  {}
  private getNode(plan: Plan):TreeNode {
    return {
      label: plan.name,
      type: 'mainNode',
      icon: 'pi pi-book',
      children: [
        {
          label: 'Report',
          type: 'reportNode',
          icon: 'pi pi-flag',
          data: plan.id
        },
        {
          label: 'Edit',
          type: 'editNode',
          icon: 'pi pi-pencil',
          data: plan.id
        }
      ]
    }
  }

  public ngOnInit(): void {
    this.plansApiCaller.getPlansPage(1).subscribe((plans) => {
      this.plans = plans;
      this.plansLoaded = true;

      for (const p of this.plans) {
        this.plansTree.push(this.getNode(p));
      }
    });
  }
  onEditPressed(id: string) {
    this.router.navigate([`../edit/${id}`], { relativeTo: this.route }).then();
  }

  onReportPressed(id: string) {
    this.router.navigate([`../report/${id}`], { relativeTo: this.route }).then();
  }
}
