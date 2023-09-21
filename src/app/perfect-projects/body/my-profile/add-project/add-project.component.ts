import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Quill from 'quill';
import BlotFormatter, {DeleteAction, ImageSpec, ResizeAction} from 'quill-blot-formatter';
import {ToastService} from "../../../../services/toast.service";
import {ToastType} from "../../../../enums/toast-type";
import {AuthService} from "../../../../services/auth.service";
import {ProjectApiCallerService} from "../../../../api-caller/project-api-caller.service";
import {ProjectData} from "../../../../models/project-data";
import {ImageCroppedEvent} from 'ngx-image-cropper';

Quill.register('modules/blotFormatter', BlotFormatter);

class CustomImageSpec extends ImageSpec {
  getActions() {
    return [DeleteAction, ResizeAction];
  }
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  inputProjectTitle: string = "";
  inputBriefDescription: string = "";
  inputPicture: string = "";
  modules = {}

  imageChangedEvent: any = "";
  croppedImage: any = "";

  constructor(private projectApiCaller: ProjectApiCallerService,
              private router: Router,
              private toast: ToastService,
              private auth: AuthService) {
    this.modules = {
      blotFormatter: {
        specs: [CustomImageSpec]
      }
    };
  }

  public onSubmit(quillEditor: Quill) {
    const projectData: ProjectData = {
      id: "",
      title: this.inputProjectTitle,
      author: this.auth.getUsername(),
      visible: false,
      timestamp: 0,
      description: btoa(quillEditor.root.innerHTML),
      briefDescription: btoa(this.inputBriefDescription),
      mainPicture: btoa(this.croppedImage)
    };
    this.projectApiCaller.addProject(projectData)
      .subscribe((response) => {
        if (response.success) {
          this.toast.showMessage(`${this.inputProjectTitle} has been added!`, ToastType.SUCCESS);
          this.router.navigate(["/my-profile"]).then();
        }
      });
    return;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  public ngOnInit(): void {
    this.croppedImage = "";
  }
}
