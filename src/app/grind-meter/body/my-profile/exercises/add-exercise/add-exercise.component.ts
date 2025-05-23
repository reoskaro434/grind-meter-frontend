import {Component, OnInit} from '@angular/core';
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {Exercise, ExerciseType} from "../../../../../models/exercise";
import {ToastService} from "../../../../../services/toast.service";
import {NgForm} from "@angular/forms";
import {v4} from 'uuid';

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

    const exercise: Exercise = {
      id: v4(),
      name: exerciseName,
      type: ExerciseType.Lift
    };

    this.exerciseApiCaller.addExercise(exercise).subscribe(()=> document.location.reload());
  }



}
