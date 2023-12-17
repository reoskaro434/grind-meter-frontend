import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise";
import {ActivatedRoute} from "@angular/router";
import {PlanApiCallerService} from "../../../../api-caller/plan-api-caller.service";
import {Plan} from "../../../../models/plan";

@Component({
  selector: 'exercise-report',
  templateUrl: './exercise-report.component.html',
  styleUrls: ['./exercise-report.component.css']
})
export class ExerciseReportComponent implements OnInit {
  private _planLoaded: boolean = false;
  private _exercisesLoaded: boolean = false;

  exercises: Exercise[] = [];
  planId = '';
  plan: Plan | undefined;

  get loaded(): boolean {
    return this._planLoaded && this._exercisesLoaded;
  }

  constructor(private planApiCaller: PlanApiCallerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.planId = this.route.snapshot.params['planId'];
    this.planApiCaller.getPlan(this.planId).subscribe(plan => {
      this.plan = plan
      this._planLoaded = true;


    });
    this.planApiCaller.getExercises(this.planId).subscribe(exercises => {
      this.exercises = exercises;
      this._exercisesLoaded = true;
    });
  }
}
