import {Component} from '@angular/core';
import {Exercise, ExerciseState} from "../../../../../models/exercise";
import {ActivatedRoute} from "@angular/router";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {ToastService} from "../../../../../services/toast.service";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {SaveExercisesModel} from "../../../../../models/save-exercises";
import {SelectionModel} from "@angular/cdk/collections";
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

    this.planApiCaller.getExercisesId(this.planId).subscribe((exercisesId) => {
      this.exerciseApiCaller.getExercisePage(1).subscribe((exercises) => {

        for (let i = 0; i < exercises.length; i++) {
          if (exercisesId.includes(exercises[i].id))
            exercises[i].state = ExerciseState.Active;
        }

        this.exercises = exercises;
      });
    });



  }

  public onCheckboxPressed(exercise: Exercise): string {
    if (exercise.state === ExerciseState.Active) {
      exercise.state = ExerciseState.Inactive;
    } else {
      exercise.state = ExerciseState.Active;
    }


    return `${this.selection.isSelected(exercise.state === ExerciseState.Active) ? 'select' : 'deselect'}`;
  }
  public isChecked(exercise: Exercise){
    return exercise.state === ExerciseState.Active;
  }

  onSavePressed() {
    const saveExercisesModel : SaveExercisesModel = {
      planId: this.planId,
      exerciseIdList: []
    }

    for (let i = 0; i < this.exercises.length; i++) {

      if (this.exercises[i].state === ExerciseState.Active) {
        console.log(this.exercises[i]);
        saveExercisesModel.exerciseIdList.push(this.exercises[i].id);
      }

    }


    this.planApiCaller.saveExercises(saveExercisesModel).subscribe((resp) => {
      this.toast.showMessage('Saved!', ToastType.INFO);
    });
  }
}
