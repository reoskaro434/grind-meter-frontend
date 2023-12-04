import {Component, OnInit} from '@angular/core';
import {Exercise, ExerciseState} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ToastService} from "../../../../services/toast.service";
import {map, of} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {ToastType} from "../../../../enums/toast-type";
import {catchError} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Plan} from "../../../../models/plan";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercisesTree: TreeNode[] = [];
  exercises: Exercise[] = [];
  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private router: Router,
              private route: ActivatedRoute)
  {}

  private getNode(exercise: Exercise):TreeNode {
    return {
      label: exercise.name,
      children: [
        {
          label: 'Statistics',
          data: exercise.id,
          type: 'navigateToStatistics'
        }
      ]
    }
  }

  public ngOnInit(): void {
    this.exerciseApiCaller.getExercisePage(1).subscribe((exercises) => {
      this.exercises = exercises;

      for (const e of this.exercises) {
        this.exercisesTree.push(this.getNode(e));
      }
    });
  }

  public navigateToStatistics(exerciseId: any) {
    this.router.navigate([`../statistics/${exerciseId}`], { relativeTo: this.route }).then();
  }
}
