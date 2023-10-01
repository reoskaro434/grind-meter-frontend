import {Component, OnInit} from '@angular/core';
import {Exercise, ExerciseType} from "../../../../models/exercise";
import {ExercisesApiCallerService} from "../../../../api-caller/exercises-api-caller.service";
import {map} from "rxjs";
import {catchError} from "rxjs/operators";
import {LiftExerciseReport} from "../../../../models/lift-exercise-report";

@Component({
  selector: 'daily-workout-report',
  templateUrl: './daily-workout-report.component.html',
  styleUrls: ['./daily-workout-report.component.css']
})
export class DailyWorkoutReportComponent implements OnInit {

  exercises: Exercise[] = [
    {
      id: 'id123bench press',
      name: 'bench press',
      type: ExerciseType.Lift
    },
    {
      id: 'id123squat',
      name: 'squat',
      type: ExerciseType.Lift
    },
    {
      id: 'id123biceps curls',
      name: 'biceps curls',
      type: ExerciseType.Lift
    },
    {
      id: 'id123lat pulldowns',
      name: 'lat pulldowns',
      type: ExerciseType.Lift
    }
  ];

  currentExercise: Exercise | null = null;

  dailyExerciseReports = [];
  constructor(private exerciseApiCaller: ExercisesApiCallerService) {}

  ngOnInit(): void {
    this.exerciseApiCaller.getDailyExercises()
      .pipe(map((response) => {
        this.exercises = response.payload.exercises;
        this.currentExercise = this.exercises.length > 0 ? this.exercises[0] : null;
      }));
  }

  openExerciseUpdateMenu(id: string): void {
    const exercise = this.exercises.find((exercise) => exercise.id === id);
    if (exercise)
      this.currentExercise = exercise;
  }
}
