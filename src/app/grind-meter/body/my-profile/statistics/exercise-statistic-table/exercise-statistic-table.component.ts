import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {map} from "rxjs";
import {ToastType} from "../../../../../enums/toast-type";
import {ToastService} from "../../../../../services/toast.service";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {Exercise} from "../../../../../models/exercise";
import {TreeNode} from "primeng/api";
import {PaginatorState} from "primeng/paginator";

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
  date: any;
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
          isMainRow: false,
          date: set.index + '.',
          volume: (set.weight.mass * set.repetitions) + 'kg', // todo fix mass unit to dynamic
          repetitions: set.repetitions,
          weight: set.weight.mass + 'kg'
        },
        type: 'body',
      });
      volume += set.weight.mass * set.repetitions;
      repetitions += set.repetitions;
      max = Math.max(max, set.weight.mass);
    }

    return {
      data: {
        isMainRow: true,
        date: new Date(report.timestamp).toLocaleDateString(),
        volume: volume  + 'kg',
        repetitions: repetitions,
        max: max,
        weight: '[kg]'
      },
      type: 'default',
      children: childNodes
    }
  }
  ngOnInit(){
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'repetitions', header: 'Reps' },
      { field: 'weight', header: 'Weight' },
      { field: 'volume', header: 'Volume' },
      { field: 'max', header: 'Max' },
    ];

    this.exerciseId = this.route.snapshot.params['exerciseId'];

    this.date = new Date();
    const currentMonth = this.date.getMonth() + 1;
    const currentYear = this.date.getFullYear();

    this.exerciseApiCallerService.getExerciseById(this.exerciseId).pipe(map((exercise) => {
      this.exercise = exercise;

      const startEndTimestamps = this.getStartEndMonthTimestamps(currentMonth, currentYear);

      this.loadNewReports(this.exerciseId, startEndTimestamps.start, startEndTimestamps.end);
    })).subscribe();
  }

  private loadNewReports(id: string, start: number, end: number) {
    this.exerciseReportApiCaller.getReportsFromRange(id, start, end)
      .subscribe((report_list) => {
        this.treeNodes = [];
        this.exerciseReportList = report_list;
        for (const el of this.exerciseReportList) {
          this.treeNodes.push(this.getNode(el));
        }
        this.loaded = true;
      });
  }

  private getStartEndMonthTimestamps(month: number, year: number): { start: number; end: number } {
    // Adjust month to be 0-indexed
    const adjustedMonth = month - 1;

    const startTimestamp = new Date(year, adjustedMonth, 1).getTime();
    const endTimestamp = new Date(year, adjustedMonth + 1, 0).getTime();

    return {
      start: startTimestamp,
      end: endTimestamp
    };
  }

  onCalendarClose() {
    console.log('superog')
    this.loaded = false;

    const currentMonth = this.date.getMonth() + 1;
    const currentYear = this.date.getFullYear();

    const startEndTimestamps = this.getStartEndMonthTimestamps(currentMonth, currentYear);

    this.loadNewReports(this.exerciseId, startEndTimestamps.start, startEndTimestamps.end);
  }
}
