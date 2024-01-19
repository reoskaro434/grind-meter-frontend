import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {Plan} from "../../../../../models/plan";
import {ConfirmationService, TreeNode} from "primeng/api";

@Component({
  selector: 'app-plans',
  templateUrl: './show-plans.component.html',
  styleUrls: ['./show-plans.component.css']
})
export class ShowPlansComponent implements OnInit {
  plans: Plan[] = [];
  plansTree: TreeNode[] = [];
  plansLoaded: boolean = false;
  totalPlans: number = 0;
  PLANS_PER_ACCOUNT = 5;
  renameModalPlan: Plan = {id: "", name: "", exerciseIdList: [], userId: ""};
  renameModalVisible: boolean = false;

  constructor(private plansApiCaller: PlanApiCallerService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmation: ConfirmationService)
  {}
  private getNode(plan: Plan):TreeNode {
    return {
      label: plan.name,
      data: plan.id,
      type: 'default',
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
          icon: 'pi pi-cog',
          data: plan.id
        },
        {
          label: 'Rename',
          data: plan.id,
          type: 'renameNode',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Delete',
          data: {planId: plan.id, planName: plan.name},
          type: 'deleteNode',
          icon: 'pi pi-trash'
        }
      ]
    }
  }

  private sortPlans() {
    this.plans.sort((a, b) => {
      if (!a.name || !b.name) {
        return 0;
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }

  public ngOnInit(): void {
    this.plansApiCaller.getPlans().subscribe((plans) => {
      this.plans = plans;

      this.sortPlans();

      this.totalPlans = this.plans.length;
      this.plansLoaded = true;

      for (const p of this.plans) {
        this.plansTree.push(this.getNode(p));
      }
    }, error => this.plansLoaded = true);
  }
  onEditPressed(id: string) {
    this.router.navigate([`../edit/${id}`], { relativeTo: this.route }).then();
  }

  onReportPressed(id: string) {
    this.router.navigate([`../report/${id}`], { relativeTo: this.route }).then();
  }

  rename(exerciseId: any) {
    const plan = this.plans.find((e)=> e.id === exerciseId);
    console.log(plan);
    if (plan) {
      this.renameModalPlan = plan;
      this.renameModalVisible = true;
    }
  }

  updateExercise() {
    if (this.renameModalPlan)
      this.plansApiCaller.updatePlan(this.renameModalPlan).subscribe();
    const node = this.plansTree
      .find(node => node.data === this.renameModalPlan.id);
    node!.label = this.renameModalPlan.name;
    this.renameModalVisible = false;

  }

  onDeletePressed(data: {planId: string, planName: string}) {
    this.confirmation.confirm({
      message: `Are you sure you want to delete?`,
      header: data.planName,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.plansApiCaller.deletePlan(data.planId).subscribe(() => window.location.reload());
      },
      reject: () => {}});
  }
}
