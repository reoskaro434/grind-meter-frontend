import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {map} from "rxjs";
import {ToastType} from "../../../../../enums/toast-type";
import {ToastService} from "../../../../../services/toast.service";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {SelectionModel} from "@angular/cdk/collections";
import {Exercise} from "../../../../../models/exercise";

@Component({
  selector: 'app-exercise-statistic-table',
  templateUrl: './exercise-statistic-table.component.html',
  styleUrls: ['./exercise-statistic-table.component.css']
})
export class ExerciseStatisticTableComponent implements OnInit {
  exerciseId :string = '';
  exercise: Exercise | undefined;
  exerciseReportList: LiftExerciseReport[] | undefined = undefined;
  constructor(private route:ActivatedRoute,
              private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private exerciseApiCallerService: ExerciseApiCallerService,
              private toast: ToastService){}
  ngOnInit(){
    this.exerciseId = this.route.snapshot.params['exerciseId'];

    this.exerciseApiCallerService.getExerciseById(this.exerciseId).pipe(map((exercise) => {
      console.log(exercise);

      this.exercise = exercise;

      this.exerciseReportApiCaller.getReports(this.exerciseId, 1)
        .pipe(map((exerciseReportList) => {
          if (exerciseReportList.length == 0){
            this.toast.showMessage('Could not find statistics for the exercise', ToastType.INFO);
          }
          this.exerciseReportList = exerciseReportList;
        })).subscribe();
    })).subscribe();


  }

}
