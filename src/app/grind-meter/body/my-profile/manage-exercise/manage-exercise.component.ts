import {Component, OnInit} from '@angular/core';
import {Exercise, ExerciseState} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ToastService} from "../../../../services/toast.service";
import {map, of} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {ToastType} from "../../../../enums/toast-type";
import {catchError} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-manage-exercise',
  templateUrl: './manage-exercise.component.html',
  styleUrls: ['./manage-exercise.component.css']
})
export class ManageExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  displayedColumns: string[] = ['name', 'type', 'isActive', 'Actions'];
  selection = new SelectionModel<boolean>(true, []);
  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private toast: ToastService,
              private router: Router,
              private route: ActivatedRoute)
  {}
  public ngOnInit(): void {
    this.exerciseApiCaller.getExercisePage(1).pipe(map((exercises) => {
      this.exercises = exercises;
    }), catchError(err => {
      this.toast.showMessage('No exercise found!', ToastType.INFO);
      return of(err);
    })).subscribe(); //TODO pagination
  }

  private updateVisibility(exercise: Exercise){
    if (exercise.state == ExerciseState.Active) {
      this.exerciseApiCaller.setExerciseInactive(exercise.id).pipe(map((success) => {
        if (success) {
          exercise.state = ExerciseState.Inactive;
        }
      })).subscribe();
    } else {
      this.exerciseApiCaller.setExerciseActive(exercise.id).pipe(map((success) => {
        if (success) {
          exercise.state = ExerciseState.Active;
        }
      })).subscribe();
    }
  }

  public onCheckboxPressed(exercise: Exercise): string {
    this.updateVisibility(exercise)

    return `${this.selection.isSelected(exercise.state === ExerciseState.Active) ? 'select' : 'deselect'}`;
  }
  public isChecked(exercise: Exercise){
    return exercise.state === ExerciseState.Active;
  }

  public onExerciseClicked(row: Exercise) {
    console.log(row);
  }

  public navigateToStatistics(exerciseId: any) {
    console.log(exerciseId);
    this.router.navigate([`../statistics/${exerciseId}`], { relativeTo: this.route }).then();
  }
}
