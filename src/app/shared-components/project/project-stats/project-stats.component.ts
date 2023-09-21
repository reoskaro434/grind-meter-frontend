import {Component, Input, OnInit} from '@angular/core';
import {ScoresApiCallerService} from "../../../api-caller/scores-api-caller.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {ToastType} from "../../../enums/toast-type";
import {SavesApiCallerService} from "../../../api-caller/saves-api-caller.service";


@Component({
  selector: 'app-project-stats',
  templateUrl: './project-stats.component.html',
  styleUrls: ['./project-stats.component.css']
})
export class ProjectStatsComponent implements OnInit {

  @Input() projectId: string = "";

  score?: number;
  scored?: boolean;

  saves?: number;
  saved?: boolean;

  constructor(private scoresApiCaller: ScoresApiCallerService,
              private savesApiCaller: SavesApiCallerService,
              private auth: AuthService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.getScoresInformation();
    this.getSavesInformation();
  }

  private getSavesInformation(): void {
    this.savesApiCaller.getSaveCount(this.projectId).subscribe((response) => {
      this.saves = response.saves;
    });
    const username = this.auth.getUsername();
    if (username !== "") {
      this.savesApiCaller.getSaveStatus(this.projectId).subscribe((response) => {
        this.saved = response.saved;
      });
    } else { // Assuming user is no signed in
      this.saved = false;
    }
  }

  private getScoresInformation(): void {
    this.scoresApiCaller.getScoresCount(this.projectId).subscribe((response) => {
      this.score = response.scores;
    });
    const username = this.auth.getUsername();
    if (username !== "") {
      this.scoresApiCaller.getScoredStatus(this.projectId).subscribe((response) => {
        this.scored = response.scored;
      });
    } else { // Assuming user is no signed in
      this.scored = false;
    }
  }

  public addScore(): void {
    const username = this.auth.getUsername();
    if (username !== "") {
      this.scoresApiCaller.addScore(this.projectId).subscribe((response) => {
        if (response.success) {
          if (this.score !== undefined) {
            this.score++;
            this.scored = true;
          }
        }
      });
    } else {
      this.toast.showMessage("Sign in to score a project!", ToastType.INFO);
    }
  }

  public deleteScore(): void {
    this.scoresApiCaller.deleteScore(this.projectId).subscribe((response) => {
      if (response.success) {
        if (this.score !== undefined) {
          this.score--;
          this.scored = false;
        }
      }
    });
  }


  public deleteSave() {
    this.savesApiCaller.deleteSave(this.projectId).subscribe((response) => {
      if (response.success) {
        if (this.saves !== undefined) {
          this.saves--;
          this.saved = false;
        }
      }
    });
  }

  public saveProject() {
    const username = this.auth.getUsername();
    if (username !== "") {
      this.savesApiCaller.saveProject(this.projectId).subscribe((response) => {
        console.log(response);
        if (response.success) {
          if (this.saves !== undefined) {
            console.log("increasing");
            this.saves++;
            this.saved = true;
          }
        }
      });
    } else {
      this.toast.showMessage("Sign in to save a project!", ToastType.INFO);
    }
  }
}
