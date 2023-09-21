import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectApiCallerService} from "../../../api-caller/project-api-caller.service";
import {ProjectData} from "../../../models/project-data";
import {ToastService} from "../../../services/toast.service";
import {ToastType} from "../../../enums/toast-type";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  public project: ProjectData | undefined;
  public latestUpdateDate: any;
  public latestUpdateTime: any;

  constructor(private route: ActivatedRoute,
              private projectRest: ProjectApiCallerService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const projectId = paramMap.get("projectId");
      if (projectId != null) {
        this.projectRest.getProject(projectId).subscribe((response) => {
          if (response.description) {
            if (!response.mainPicture)
              response.mainPicture = "";

            this.project = {
              id: response.id,
              title: response.title,
              author: response.author,
              description: atob(response.description),
              briefDescription: atob(response.briefDescription),
              mainPicture: atob(response.mainPicture),
              visible: response.visible,
              timestamp: response.timestamp
            };
            const date: Date = new Date(response.timestamp * 1000);
            this.latestUpdateDate = date.toLocaleDateString();
            this.latestUpdateTime = date.toLocaleTimeString();
          }
        },(error)=>{
          this.toast.showMessage("The project does not exist or is no longer public", ToastType.ERROR);
          this.project = {
            id: "",
            title: "I can't find the project :(",
            author: "Gall Anonim",
            description: "It seems like the project you are looking for has no longer public access or does not exist.",
            briefDescription: "",
            mainPicture: "",
            visible: false,
            timestamp: 0,
          };
          this.latestUpdateDate = 1117;
          this.latestUpdateTime = "";
        });
      }
    });
  }
}
