import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {map} from "rxjs";
import {ToastType} from "../../../../enums/toast-type";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'daily-workout-report',
  templateUrl: './daily-workout-report.component.html',
  styleUrls: ['./daily-workout-report.component.css']
})
export class DailyWorkoutReportComponent implements OnInit {

  exercises: Exercise[] = [];

  currentExercise: Exercise | null = null;

  dailyExerciseReports = []; // TODO add option to save offline workout
  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private toast: ToastService) {}

  ngOnInit(): void {
    this.exerciseApiCaller.getActiveExercises()
      .pipe(map((response) => {
        this.exercises = response;
        console.log(this.exercises)
        this.currentExercise = this.exercises.length > 0 ? this.exercises[0] : null;
        if (this.exercises.length == 0){
          this.toast.showMessage('No active exercise!', ToastType.INFO);
        }
      })).subscribe();
  }

  openExerciseUpdateMenu(id: string): void {
    const exercise = this.exercises.find((exercise) => exercise.id === id);
    if (exercise)
      this.currentExercise = exercise;
  }
}
