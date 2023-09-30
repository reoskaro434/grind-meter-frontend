import {Component, OnInit} from '@angular/core';
import {BasicExerciseData} from "../../../../models/basic-exercise-data";

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

  constructor() {
  }

  ngOnInit(): void {
    // TODO download exercises list from the server...

    this.activeExercise = this.exercises.length > 0 ? this.exercises[0] : null;
  }

  openExerciseUpdateMenu(id: string): void {
    const exercise = this.exercises.find((exercise) => exercise.id === id);
    if (exercise)
      this.activeExercise = exercise;
  }
}
