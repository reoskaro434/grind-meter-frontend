import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ToastService} from "../../../../services/toast.service";
import {map} from "rxjs";


@Component({
  selector: 'app-manage-exercise',
  templateUrl: './manage-exercise.component.html',
  styleUrls: ['./manage-exercise.component.css']
})
export class ManageExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
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
    this.exerciseApiCaller.setExerciseActive(exercise.id).pipe(map((success) => {
      if (success) {
        exercise.isActive = true;
      }
    })).subscribe();
  }

}
