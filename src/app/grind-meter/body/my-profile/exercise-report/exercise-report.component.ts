import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {map} from "rxjs";
import {ToastType} from "../../../../enums/toast-type";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute} from "@angular/router";
import {PlanApiCallerService} from "../../../../api-caller/plan-api-caller.service";

@Component({
  selector: 'exercise-report',
  templateUrl: './exercise-report.component.html',
  styleUrls: ['./exercise-report.component.css']
})
export class ExerciseReportComponent implements OnInit {

  exercises: Exercise[] = [];

  currentExercise: Exercise | null = null;
  planId = '';
  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private planApiCaller: PlanApiCallerService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.planId = this.route.snapshot.params['planId'];
    this.planApiCaller.getExercises(this.planId).subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  openExerciseUpdateMenu(id: string): void {
    const exercise = this.exercises.find((exercise) => exercise.id === id);
    if (exercise)
      this.currentExercise = exercise;
  }
}
