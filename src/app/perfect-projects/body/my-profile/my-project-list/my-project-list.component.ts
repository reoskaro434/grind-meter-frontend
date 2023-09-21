import {Component, OnInit} from '@angular/core';
import {UserProfileApiCallerService} from "../../../../api-caller/user-profile-api-caller.service";
import {ProjectApiCallerService} from "../../../../api-caller/project-api-caller.service";
import {BasicProjectData} from "../../../../models/basic-project-data";
import {ToastService} from "../../../../services/toast.service";
import {ToastType} from "../../../../enums/toast-type";

@Component({
  selector: 'app-my-project-list',
  templateUrl: './my-project-list.component.html',
  styleUrls: ['./my-project-list.component.css']
})
export class MyProjectListComponent implements OnInit {

  public projects?: BasicProjectData[];

  constructor(private userProfileApiCaller: UserProfileApiCallerService,
              private projectApiCaller: ProjectApiCallerService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  onProjectDelete(projectId: string) {
    this.projectApiCaller.deleteProject(projectId).subscribe((response) => {
      if (response.success && this.projects !== undefined) {
        this.toast.showMessage(`Project has been deleted`, ToastType.INFO);
        const index = this.projects.findIndex(x => x.id == projectId);
        this.projects.splice(index, 1);
        this.projects = [...this.projects];
      }
    });
  }

  updateVisibility(projectId: string, visible: boolean) {
    this.userProfileApiCaller.updateVisibility(projectId, visible)
      .subscribe((response) => {
        if (response.success) {
            this.toast.showMessage(`Updated visibility`, ToastType.INFO);
          this.loadProjects();
        }
      });
  }

  private loadProjects() {
    this.userProfileApiCaller.getProjects().subscribe((response) => {
      if (response.projects !== undefined) {
        this.projects = [...response.projects];
        this.projects.forEach(project => {
          if (project.mainPicture === "") {
            project.mainPicture = "assets/perfectProjectsDefaultPicture.png";
          } else {
            project.mainPicture = atob(project.mainPicture);
          }
          project.briefDescription = atob(project.briefDescription);
        });
      }
    });
  }
}
