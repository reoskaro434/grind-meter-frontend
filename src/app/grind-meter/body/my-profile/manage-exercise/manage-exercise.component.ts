import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ToastService} from "../../../../services/toast.service";
import {map} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-manage-exercise',
  templateUrl: './manage-exercise.component.html',
  styleUrls: ['./manage-exercise.component.css']
})
export class ManageExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  displayedColumns: string[] = ['name', 'type', 'isActive'];
  selection = new SelectionModel<boolean>(true, []);
  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private toast: ToastService)
  {}
  public ngOnInit(): void {
    this.exerciseApiCaller.getExercisePage(1).pipe(map((exercises) => {
      console.log(exercises);
      this.exercises = exercises;
    })).subscribe(); //TODO pagination
  }
  public onSubmit() {
  }
  updateVisibility(exercise: Exercise){
    if (exercise.isActive) {
      this.exerciseApiCaller.setExerciseInactive(exercise.id).pipe(map((success) => {
        if (success) {
          exercise.isActive = false;
        }
      })).subscribe();
    }
    this.exerciseApiCaller.setExerciseActive(exercise.id).pipe(map((success) => {
      if (success) {
        exercise.isActive = true;
      }
    })).subscribe();
  }

  onCheckboxPressed(exercise: Exercise): string {
    this.updateVisibility(exercise)

    return `${this.selection.isSelected(exercise.isActive) ? 'deselect' : 'select'}`;
  }

}
