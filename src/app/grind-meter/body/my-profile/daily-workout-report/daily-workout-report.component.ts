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
  // exercises: Exercise[] = [
  //   {
  //     id: 'id123bench press',
  //     name: 'bench press',
  //     type: ExerciseType.Lift,
  //     state: true
  //   },
  //   {
  //     id: 'id123squat',
  //     name: 'squat',
  //     type: ExerciseType.Lift,
  //     state: true
  //   },
  //   {
  //     id: 'id123biceps curls',
  //     name: 'biceps curls',
  //     type: ExerciseType.Lift,
  //     state: true
  //   },
  //   {
  //     id: 'id123lat pulldowns',
  //     name: 'lat pulldowns',
  //     type: ExerciseType.Lift,
  //     state: true
  //   }
  // ];

  currentExercise: Exercise | null = null;

  dailyExerciseReports = [];
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
