import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise";
import {ActivatedRoute} from "@angular/router";
import {PlanApiCallerService} from "../../../../api-caller/plan-api-caller.service";

@Component({
  selector: 'exercise-report',
  templateUrl: './exercise-report.component.html',
  styleUrls: ['./exercise-report.component.css']
})
export class ExerciseReportComponent implements OnInit {
  exercises: Exercise[] = [];
  planId = '';
  loaded: boolean = false;

  constructor(private planApiCaller: PlanApiCallerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.planId = this.route.snapshot.params['planId'];
    this.planApiCaller.getExercises(this.planId).subscribe(exercises => {
      this.exercises = exercises;
      this.loaded = true;
    });
  }
}
