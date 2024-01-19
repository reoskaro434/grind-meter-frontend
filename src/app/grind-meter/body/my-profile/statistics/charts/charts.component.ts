import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExerciseReportApiCallerService} from "../../../../../api-caller/exercise-report-api-caller.service";
import {ExerciseApiCallerService} from "../../../../../api-caller/exercise-api-caller.service";
import {map} from "rxjs";
import {Exercise} from "../../../../../models/exercise";
import {LiftExerciseReport} from "../../../../../models/lift-exercise-report";
import {LiftExerciseDataChunk} from "../../../../../models/lift-exercise-data-chunk";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  seriesData: any;
  volumeData: any;
  repetitionData: any;
  maxWeightData: any;
  loaded: boolean = false;
  exerciseId: string = '';
  date: any;
  exercise: Exercise | undefined;
  generalPlotOptions= this.getGeneralPlotOptions();
  generalBarOptions= this.getGeneralBarOptions();
  dataChunkList: LiftExerciseDataChunk[] = [];
  chartWidth: number = 0;
  POLE_CHART_WIDTH: number = 25;

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

  private getDataChunk(report: LiftExerciseReport): LiftExerciseDataChunk {
    const seriesData = [];
    let volume = 0;
    let repetitions = 0;
    let max = 0;

    for (const set of report.sets) {
      seriesData.push({
          series: set.index,
          volume: set.weight.mass * set.repetitions,
          repetitions: set.repetitions,
          mass: set.weight.mass
      });
      volume += set.weight.mass * set.repetitions;
      repetitions += set.repetitions;
      max = Math.max(max, set.weight.mass);
    }

    return {
        date: new Date(report.timestamp).toLocaleDateString(),
        volume: volume,
        repetitions: repetitions,
        max: max,
        seriesData: seriesData
    }
  }

  private getGeneralBarOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
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
  }

  private getGeneralPlotOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
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
  }

  private drawCharts(reportList: LiftExerciseReport[])  {
    this.chartWidth = reportList.length * this.POLE_CHART_WIDTH;
    let maxIndex = 0;
    const documentStyle = getComputedStyle(document.documentElement);

    for (const report of reportList) {
      maxIndex = Math.max(report.sets.length, maxIndex);
      this.dataChunkList.unshift(this.getDataChunk(report));
    }

    const date = this.dataChunkList.map((chunk: LiftExerciseDataChunk) => chunk.date);

    const dataset = [];

    for (let i = 0; i < maxIndex; i++) {
      dataset.push({
        label: `series ${i+1}`,
        data: this.dataChunkList.map((chunk: LiftExerciseDataChunk) => {
          if (i < chunk.seriesData.length) {
            return chunk.seriesData[i].mass;
          }
          return null;
        }),
        fill: false,
        tension: 0.2
      })
    }

    this.seriesData = {
      labels: date,
      datasets: dataset,

    };

    this.volumeData = {
      labels: date,
      datasets: [
        {
          label: 'Total Repetitions [kg]',
          data: this.dataChunkList.map((chunk: LiftExerciseDataChunk) => chunk.repetitions),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        }
      ]
    };

    this.repetitionData = {
      labels: date,
      datasets: [
        {
          label: 'Total Volume [kg]',
          data: this.dataChunkList.map((chunk: LiftExerciseDataChunk) => chunk.volume),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          tension: 0.4
        }
      ]
    };

    this.maxWeightData = {
      labels: date,
      datasets: [
        {
          label: 'Max Weight [kg]',
          data: this.dataChunkList.map((chunk: LiftExerciseDataChunk) => chunk.max),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--red-500'),
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
