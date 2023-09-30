// import {Component, OnInit} from '@angular/core';
// import {ProjectApiCallerService} from "../../../../api-caller/project-api-caller.service";
// import {ActivatedRoute, Router} from "@angular/router";
// import {ToastService} from "../../../../services/toast.service";
// import {AuthService} from "../../../../services/auth.service";
// import Quill from "quill";
// import {ProjectData} from "../../../../models/project-data";
// import {ToastType} from "../../../../enums/toast-type";
// import {ImageCroppedEvent} from "ngx-image-cropper";
// import BlotFormatter, {DeleteAction, ImageSpec, ResizeAction} from "quill-blot-formatter";
//
// Quill.register('modules/blotFormatter', BlotFormatter);
//
// class CustomImageSpec extends ImageSpec {
//   getActions() {
//     return [DeleteAction, ResizeAction];
//   }
// }
//
// @Component({
//   selector: 'app-edit-project',
//   templateUrl: './edit-project.component.html',
//   styleUrls: ['./edit-project.component.css']
// })
// export class EditProjectComponent implements OnInit {
//
//
//   inputProjectTitle: string = "";
//   inputBriefDescription: string = "";
//   inputPicture: string = "";
//   modules = {}
//
//   imageChangedEvent: any = "";
//   croppedImage: any = "";
//   quillEditor: any;
//   projectId: string | null | undefined;
//
//   constructor(private projectApiCaller: ProjectApiCallerService,
//               private router: Router,
//               private toast: ToastService,
//               private auth: AuthService,
//               private route: ActivatedRoute) {
//     this.modules = {
//       blotFormatter: {
//         specs: [CustomImageSpec]
//       }
//     };
//   }
//
//   public onSubmit(quillEditor: Quill) {
//     if (this.projectId) {
//       const projectData: ProjectData = {
//         id: this.projectId,
//         title: this.inputProjectTitle,
//         author: this.auth.getUsername(),
//         visible: false,
//         timestamp: 0,
//         description: btoa(quillEditor.root.innerHTML),
//         briefDescription: btoa(this.inputBriefDescription),
//         mainPicture: btoa(this.croppedImage)
//       };
//       this.projectApiCaller.updateProject(projectData)
//         .subscribe((response) => {
//           if (response.success) {
//             this.toast.showMessage(`${this.inputProjectTitle} has been updated!`, ToastType.SUCCESS);
//             this.router.navigate(["/my-profile"]).then();
//           }
//         });
//     }
//   }
//
//   fileChangeEvent(event: any): void {
//     this.imageChangedEvent = event;
//   }
//
//   imageCropped(event: ImageCroppedEvent) {
//     this.croppedImage = event.base64;
//   }
//
//   public ngOnInit(): void {
//     this.croppedImage = "";
//     this.route.paramMap.subscribe(paramMap => {
//       this.projectId = paramMap.get("projectId");
//       if (this.projectId) {
//         this.projectApiCaller.getProject(this.projectId).subscribe((response) => {
//           this.inputProjectTitle = response.title;
//           this.inputBriefDescription = atob(response.briefDescription);
//           this.quillEditor = atob(response.description);
//           this.croppedImage = atob(response.mainPicture);
//           this.projectId = response.id;
//           if (response.mainPicture === "") {
//             this.croppedImage = "assets/perfectProjectsDefaultPicture.png";
//           }
//         });
//       } else {
//         this.router.navigate(["/"]).then();
//       }
//     });
//   }
// }
