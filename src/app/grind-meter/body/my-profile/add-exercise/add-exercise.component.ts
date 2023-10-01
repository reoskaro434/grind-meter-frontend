import {Component, OnInit} from '@angular/core';
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ExerciseType} from "../../../../models/exercise";
import {NewExercise} from "../../../../models/new-exercise";
import {map} from "rxjs";
import {ToastService} from "../../../../services/toast.service";
import {ToastType} from "../../../../enums/toast-type";
import {Form, FormBuilder, FormGroup, NgForm} from "@angular/forms";


@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  exerciseName: string = ""

  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private toast: ToastService)
  {}
  public ngOnInit(): void {
  }
  public onSubmit(addExerciseForm: NgForm) {
    const exerciseName = this.exerciseName;

    addExerciseForm.control.reset();

    const exercise: NewExercise = {
      name: exerciseName,
      type: ExerciseType.Lift
    };

    this.exerciseApiCaller.addExercise(exercise).pipe(map((response)=>{
      if (response) {
        this.toast.showMessage(`Added: ${exerciseName}`, ToastType.SUCCESS);
      }
    })).subscribe();
  }

}
