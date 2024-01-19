import {Component, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {ActivatedRoute} from "@angular/router";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {map} from "rxjs";
import {Exercise} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  data: any;
  options: any;
  loaded: boolean = false;
  exerciseId :string = '';
  date: any;
  exercise: Exercise | undefined;
  constructor(private route:ActivatedRoute,
              private exerciseReportApiCaller: ExerciseReportApiCallerService,
              private exerciseApiCallerService: ExerciseApiCallerService
  ){}

  ngOnInit(): void {
    this.exerciseId = this.route.snapshot.params['exerciseId'];

    this.date = new Date();
    const currentMonth = this.date.getMonth() + 1;
    const currentYear = this.date.getFullYear();

    this.exerciseApiCallerService.getExerciseById(this.exerciseId).pipe(map((exercise) => {
      this.exercise = exercise;

      const startEndTimestamps = this.getStartEndMonthTimestamps(currentMonth, currentYear);

      this.loadReports(this.exerciseId, 0, startEndTimestamps.end);
    })).subscribe();



  }
  private loadReports(id: string, start: number, end: number) {
    this.exerciseReportApiCaller.getReportsFromRange(id, start, end)
      .subscribe((report_list) => {
        this.drawCharts(report_list);
        this.loaded = true;
      });
  }

  private drawCharts(reportList: LiftExerciseReport[]) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    }

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };
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

}
