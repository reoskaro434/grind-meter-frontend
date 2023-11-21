import { Component } from '@angular/core';
import {Exercise, ExerciseState} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {ActivatedRoute} from "@angular/router";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {ToastService} from "../../../../../services/toast.service";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {SaveExercisesModel} from "../../../../../models/save-exercises";
import {SelectionModel} from "@angular/cdk/collections";
import {map, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastType} from "../../../../../enums/toast-type";

@Component({
  selector: 'app-add-to-plan',
  templateUrl: './add-to-plan.component.html',
  styleUrls: ['./add-to-plan.component.css']
})
export class AddToPlanComponent {

  planId: string = '';

  exercises: Exercise[] = [];
  displayedColumns: string[] = ['name', 'type', 'isActive'];
  selection = new SelectionModel<boolean>(true, []);
  readonly MAX_EXERCISES_LIST = 30;
  constructor(private route: ActivatedRoute,
              private planApiCaller: PlanApiCallerService,
              private exerciseApiCaller: ExerciseApiCallerService,
              private toast: ToastService) {
  }

  ngOnInit() {
    this.planId = this.route.snapshot.params['planId'];
    this.exerciseApiCaller.getExercisePage(1).pipe(map((exercises) => {
      this.exercises = exercises;
    }), catchError(err => {
      this.toast.showMessage('No exercise found!', ToastType.INFO);
      return of(err);
    })).subscribe(); //TODO pagination
    // const saveExercisesModel : SaveExercisesModel = {
    //   planId: this.planId,
    //   exerciseIdList: ['a', 'b', 'c']
    // }
    // this.planApiCaller.saveExercises(saveExercisesModel).subscribe((resp) => {
    //   console.log(resp);
    // });
  }

  public onCheckboxPressed(exercise: Exercise): string {
    // this.updateVisibility(exercise)

    return `${this.selection.isSelected(exercise.state === ExerciseState.Active) ? 'select' : 'deselect'}`;
  }
  public isChecked(exercise: Exercise){
    return exercise.state === ExerciseState.Active;
  }

  onSubmit() {

  }
}
