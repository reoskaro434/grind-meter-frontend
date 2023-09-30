import {Component, OnInit} from '@angular/core';
import {BasicExerciseData} from "../../../../models/basic-exercise-data";
import {ExercisesApiCallerService} from "../../../../api-caller/exercises-api-caller.service";
import {map} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'daily-workout-report',
  templateUrl: './daily-workout-report.component.html',
  styleUrls: ['./daily-workout-report.component.css']
})
export class DailyWorkoutReportComponent implements OnInit {

  exercises: BasicExerciseData[] = [
    {
      id: 'id123bench press',
      title: 'bench press'
    },
    {
      id: 'id123squat',
      title: 'squat'
    },
    {
      id: 'id123biceps curls',
      title: 'biceps curls'
    },
    {
      id: 'id123lat pulldowns',
      title: 'lat pulldowns'
    }
  ];

  activeExercise: BasicExerciseData | null = null;

  constructor(private exerciseApiCaller: ExercisesApiCallerService) {}

  ngOnInit(): void {
    this.exerciseApiCaller.getActiveExercises()
      .pipe(map((response) => {
        this.exercises = response.payload.exercises;
        this.activeExercise = this.exercises.length > 0 ? this.exercises[0] : null;
      }));
  }

  openExerciseUpdateMenu(id: string): void {
    const exercise = this.exercises.find((exercise) => exercise.id === id);
    if (exercise)
      this.activeExercise = exercise;
  }
}
