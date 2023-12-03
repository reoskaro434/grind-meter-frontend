import {Component} from '@angular/core';
import {Exercise, ExerciseState} from "../../../../../models/exercise";
import {ActivatedRoute} from "@angular/router";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {ToastService} from "../../../../../services/toast.service";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {SaveExercisesModel} from "../../../../../models/save-exercises";
import {ToastType} from "../../../../../enums/toast-type";

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent {
  sourceExercise: Exercise[] = [];
  targetExercise: Exercise[] = [];

  planId: string = '';

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
            this.targetExercise.push(exercises[i]);
          else
            this.sourceExercise.push(exercises[i]);
        }
      });
    });
  }

  onSavePressed() {
    const saveExercisesModel : SaveExercisesModel = {
      planId: this.planId,
      exerciseIdList: []
    }

    for (let i = 0; i < this.targetExercise.length; i++) {
        saveExercisesModel.exerciseIdList.push(this.targetExercise[i].id);
    }

    this.planApiCaller.saveExercises(saveExercisesModel).subscribe((resp) => {
      this.toast.showMessage('Saved!', ToastType.INFO);
    });
  }
}
