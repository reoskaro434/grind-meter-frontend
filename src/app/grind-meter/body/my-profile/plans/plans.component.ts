import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../../services/toast.service";
import {map, of} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {ToastType} from "../../../../enums/toast-type";
import {catchError} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanApiCallerService} from "../../../../api-caller/plan-api-caller.service";
import {Plan} from "../../../../models/plan";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];
  displayedColumns: string[] = ['name', 'isActive', 'Actions'];
  selection = new SelectionModel<boolean>(true, []);
  constructor(private plansApiCaller: PlanApiCallerService,
              private toast: ToastService,
              private router: Router,
              private route: ActivatedRoute)
  {}
  public ngOnInit(): void {
    this.plansApiCaller.getPlansPage(1).pipe(map((plans) => {
      this.plans = plans;
    }), catchError(err => {
      this.toast.showMessage('No plans found!', ToastType.INFO);
      return of(err);
    })).subscribe(); //TODO pagination
  }

  // private updateVisibility(exercise: Exercise){
  //   if (exercise.state == ExerciseState.Active) {
  //     this.exerciseApiCaller.setExerciseInactive(exercise.id).pipe(map((success) => {
  //       if (success) {
  //         exercise.state = ExerciseState.Inactive;
  //       }
  //     })).subscribe();
  //   } else {
  //     this.exerciseApiCaller.setExerciseActive(exercise.id).pipe(map((success) => {
  //       if (success) {
  //         exercise.state = ExerciseState.Active;
  //       }
  //     })).subscribe();
  //   }
  // }

  // public onCheckboxPressed(exercise: Exercise): string {
  //   this.updateVisibility(exercise)
  //
  //   return `${this.selection.isSelected(exercise.state === ExerciseState.Active) ? 'select' : 'deselect'}`;
  // }
  // public isChecked(exercise: Exercise){
  //   return exercise.state === ExerciseState.Active;
  // }
  //
  // public onExerciseClicked(row: Exercise) {
  //   console.log(row);
  // }
  //
  // public navigateToStatistics(exerciseId: any) {
  //   console.log(exerciseId);
  //   this.router.navigate([`../statistics/${exerciseId}`], { relativeTo: this.route }).then();
  // }
}
