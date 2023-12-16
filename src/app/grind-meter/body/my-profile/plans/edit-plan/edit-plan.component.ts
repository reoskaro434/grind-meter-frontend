import {Component} from '@angular/core';
import {Exercise} from "../../../../../models/exercise";
import {ActivatedRoute} from "@angular/router";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {PlanApiCallerService} from "../../../../../api-caller/plan-api-caller.service";
import {Plan} from "../../../../../models/plan";
import {Day} from "../../../../../enums/day";

interface IDay {
  name: string;
  type: Day;
}
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
  days: IDay[] | undefined;
  selectedDays: { name: string, type: Day }[] = [];

  constructor(private route: ActivatedRoute,
              private planApiCaller: PlanApiCallerService,
              private exerciseApiCaller: ExerciseApiCallerService) {
  }

  ngOnInit() {
    this.days = [
      { name: "Monday", type: Day.MONDAY },
      { name: "Tuesday", type: Day.TUESDAY },
      { name: "Wednesday", type: Day.WEDNESDAY },
      { name: "Thursday", type: Day.THURSDAY },
      { name: "Friday", type: Day.FRIDAY },
      { name: "Saturday", type: Day.SATURDAY },
      { name: "Sunday", type: Day.SUNDAY }
    ];


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
}
