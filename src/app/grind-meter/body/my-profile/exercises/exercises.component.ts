import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercisesTree: TreeNode[] = [];
  exercises: Exercise[] = [];
  loaded: boolean = false;

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
          type: 'statisticsNode',
          icon: 'pi pi-chart-bar'
        }
      ]
    }
  }

  private sortTreeFirstElements() {
    this.exercisesTree.sort((node1, node2) => {
      if (!node1.label || !node2.label) {
        return 0;
      }
      if (node1.label < node2.label) {
        return -1;
      }
      if (node1.label > node2.label) {
        return 1;
      }

      return 0;
    });
  }

  public ngOnInit(): void {
    this.exerciseApiCaller.getExercisePage(1).subscribe((exercises) => {
      this.exercises = exercises;

      for (const e of this.exercises) {
        this.exercisesTree.push(this.getNode(e));
      }

      this.sortTreeFirstElements();

      this.loaded = true;
    });
  }

  public navigateToStatistics(exerciseId: any) {
    this.router.navigate([`../statistics/${exerciseId}`], { relativeTo: this.route }).then();
  }
}
