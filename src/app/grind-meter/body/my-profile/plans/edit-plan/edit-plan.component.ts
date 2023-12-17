import {Component} from '@angular/core';
import {Exercise} from "../../../../../models/exercise";
import {ActivatedRoute} from "@angular/router";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {Plan} from "../../../../../models/plan";

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent {
  sourceExercise: Exercise[] = [];
  targetExercise: Exercise[] = [];
  loaded: boolean = false;
  planId: string = '';
  plan: Plan = {id: "", name: "", exerciseIdList: [], userId: ""};
  _touched: boolean = false;

  constructor(private route: ActivatedRoute,
              private planApiCaller: PlanApiCallerService,
              private exerciseApiCaller: ExerciseApiCallerService) {
  }

  ngOnInit() {
    this.planId = this.route.snapshot.params['planId'];


    this.planApiCaller.getExercises(this.planId).subscribe((planExercises) => {
      this.exerciseApiCaller.getExercisesForAccount().subscribe((accountExercises) => {
        const exercisesId = planExercises.map(exercise => exercise.id);

        for (let i = 0; i < accountExercises.length; i++) {
          if (exercisesId.includes(accountExercises[i].id))
            this.targetExercise.push(accountExercises[i]);
          else
            this.sourceExercise.push(accountExercises[i]);
        }
        this.planApiCaller.getPlan(this.planId).subscribe(plan => {
          this.plan = plan;
          this.loaded = true;
        });
      });
    });
  }

  onSavePressed() {
    this.plan.exerciseIdList = this.targetExercise.map(exercise => exercise.id);

    this.planApiCaller.updatePlan(this.plan).subscribe();
  }

  get isPlanTouched() {
    return this._touched;
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  isDragdropEnabled() {
    return !this.isMobile();
  }

  onItemsMoved() {
    this._touched = true;
  }
}
