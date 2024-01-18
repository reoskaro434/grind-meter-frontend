import {Component, OnInit} from '@angular/core';
import {Exercise, ExerciseType} from "../../../../models/exercise";
import {ExerciseApiCallerService} from "../../../../api-caller/exercise-api-caller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, TreeNode} from "primeng/api";
import {PaginatorState} from "primeng/paginator";
import {ExerciseReportApiCallerService} from "../../../../api-caller/exercise-report-api-caller.service";

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
    type: ExerciseType.Lift,
    name: '',
    id: ''
  };

  constructor(private exerciseApiCaller: ExerciseApiCallerService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmation: ConfirmationService,
              private exerciseReportApiCaller: ExerciseReportApiCallerService)
  {}

  private getNode(exercise: Exercise):TreeNode {
    return {
      label: exercise.name,
      data: exercise.id,
      children: [
        {
          label: 'Statistics',
          data: exercise.id,
          // type: 'statisticsNode',
          icon: 'pi pi-database',
          children: [
            {
              label: 'Raw data',
              data: exercise.id,
              type: 'statisticsNode',
              icon: 'pi pi-book'
            },
            {
              label: 'CSV report',
              data: exercise.id,
              type: 'statisticsCsvNode',
              icon: 'pi pi-arrow-circle-down'
            }
          ]
        },
        {
          label: 'Edit',
          type: 'editNode',
          icon: 'pi pi-cog',
          data: exercise.id
        },
        {
          label: 'Rename',
          data: exercise.id,
          type: 'renameNode',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Delete',
          data: {exerciseId: exercise.id, exerciseName: exercise.name},
          type: 'deleteNode',
          icon: 'pi pi-trash'
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
    this.exerciseApiCaller.getExercisesForAccount().subscribe((exercises) => {
      this.exercises = exercises;
      this.totalExercises = this.exercises.length;
      this.sortExercises();

      this.loadPage(0, this.maxItemPerPage);

      this.loaded = true;
    });
  }

  public navigateToStatistics(exerciseId: any) {
    this.router.navigate([`../statistics/show/${exerciseId}`], { relativeTo: this.route }).then();
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


  onDeletePressed(data: {exerciseId: string, exerciseName: string}) {
    this.confirmation.confirm({
      message: `Are you sure you want to delete?`,
      header: data.exerciseName,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.exerciseApiCaller.deleteExercise(data.exerciseId).subscribe(() => window.location.reload());
      },
      reject: () => {}});
  }

  editExercise(exerciseId: string) {
    this.router.navigate([`../statistics/edit/${exerciseId}`], { relativeTo: this.route }).then();
  }

  downloadCsv(exerciseId: string) {
    const exercise = this.exercises.find((exercise) => exercise.id === exerciseId);

    if (exercise === undefined)
      throw Error("Could not find exercise while downloading");

    const currentTimestamp = new Date().setHours(0, 0, 0, 0);

    this.exerciseReportApiCaller.getCsvReport(exerciseId, 0, currentTimestamp).subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });

      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = downloadURL;
      link.download = `${exercise.name}.csv`;

      link.click();

      window.URL.revokeObjectURL(downloadURL);

      link.remove();
    });
  }
}
