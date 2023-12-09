import {Component, OnInit} from '@angular/core';
import {Exercise, ExerciseState, ExerciseType} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TreeNode} from "primeng/api";
import {PaginatorState} from "primeng/paginator";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercisesTree: TreeNode[] = [];
  exercises: Exercise[] = [];
  loaded: boolean = false;
  maxItemPerPage = 10;
  totalExercises = 0;
  EXERCISES_PER_ACCOUNT = 50;
  renameModalVisible = false;
  renameModalExercise: Exercise = {
    state: ExerciseState.Inactive,
    type: ExerciseType.Lift,
    name: '',
    id: ''
  };

  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private router: Router,
              private route: ActivatedRoute)
  {}

  private getNode(exercise: Exercise):TreeNode {
    return {
      label: exercise.name,
      data: exercise.id,
      children: [
        {
          label: 'Statistics',
          data: exercise.id,
          type: 'statisticsNode',
          icon: 'pi pi-chart-bar'
        },
        {
          label: 'Rename',
          data: exercise.id,
          type: 'renameNode',
          icon: 'pi pi-pencil'
        }
      ]
    }
  }

  private sortExercises() {
    this.exercises.sort((a, b) => {
      if (!a.name || !b.name) {
        return 0;
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }

  private loadPage(page: number, rows:number) {
    this.maxItemPerPage = rows;
    this.exercisesTree = [];
    const startIndex = page * this.maxItemPerPage;
    const endIndex = startIndex + this.maxItemPerPage;
    for (const e of this.exercises.slice(startIndex, endIndex)) {
      this.exercisesTree.push(this.getNode(e));
    }
  }

  public ngOnInit(): void {
    this.exerciseApiCaller.getExercisePage(1).subscribe((exercises) => {
      this.exercises = exercises;
      this.totalExercises = this.exercises.length;
      this.sortExercises();

      this.loadPage(0, this.maxItemPerPage);

      this.loaded = true;
    });
  }

  public navigateToStatistics(exerciseId: any) {
    this.router.navigate([`../statistics/${exerciseId}`], { relativeTo: this.route }).then();
  }

  onPageChange(state: PaginatorState) {
    if (state.page !== undefined && state.rows !== undefined)
    this.loadPage(state.page, state.rows);
  }

  rename(exerciseId: any) {
    const exercise = this.exercises.find((e)=> e.id === exerciseId);

    if (exercise) {
      this.renameModalExercise = exercise;
      this.renameModalVisible = true;
    }
  }

  updateExercise() {
    if (this.renameModalExercise)
      this.exerciseApiCaller.updateExercise(this.renameModalExercise).subscribe();
      const node = this.exercisesTree
        .find(node => node.data === this.renameModalExercise.id);
      node!.label = this.renameModalExercise.name;
      this.renameModalVisible = false;

  }
}
