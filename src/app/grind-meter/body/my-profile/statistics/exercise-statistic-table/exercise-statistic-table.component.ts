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
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-exercise-statistic-table',
  templateUrl: './exercise-statistic-table.component.html',
  styleUrls: ['./exercise-statistic-table.component.css']
})
export class ExerciseStatisticTableComponent implements OnInit {
  exerciseId :string = '';
  exercise: Exercise | undefined;
  exerciseReportList: LiftExerciseReport[] | undefined = undefined;
  loaded: boolean = false;
  treeNodes: TreeNode[] = [];
  cols: any[] =[];
  constructor(private route:ActivatedRoute,
              private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private exerciseApiCallerService: ExerciseApiCallerService,
              private toast: ToastService){}

  private getNode(report: LiftExerciseReport): TreeNode {
    const childNodes = [];
    let volume = 0;
    let repetitions = 0;
    let max = 0;

    for (const set of report.sets) {
      childNodes.push({
        data: {
          volume: set.weight.mass + 'kg', // todo fix mass unit to dynamic
          repetitions: set.repetitions
        },
        type: 'body',
      });
      volume += set.weight.mass;
      repetitions += set.repetitions;
      max = Math.max(max, set.weight.mass);
    }

    return {
      data: {
        date: new Date(report.timestamp).toLocaleDateString(),
        volume: volume,
        repetitions: repetitions,
        max: max
      },
      type: 'default',
      children: childNodes
    }
  }
  ngOnInit(){
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'volume', header: 'Volume' },
      { field: 'repetitions', header: 'Repetitions' },
      { field: 'max', header: 'Max' },
    ];

    this.exerciseId = this.route.snapshot.params['exerciseId'];

    this.exerciseApiCallerService.getExerciseById(this.exerciseId).pipe(map((exercise) => {
      this.exercise = exercise;

      this.exerciseReportApiCaller.getReports(this.exerciseId, 1)
        .pipe(map((exerciseReportList) => {
          if (exerciseReportList.length == 0){
            this.toast.showMessage('Could not find statistics for the exercise', ToastType.INFO);
          }
          this.exerciseReportList = exerciseReportList;
          for (const el of this.exerciseReportList) {
            this.treeNodes.push(this.getNode(el));
          }
          this.loaded = true;
        })).subscribe();
    })).subscribe();
  }

}
