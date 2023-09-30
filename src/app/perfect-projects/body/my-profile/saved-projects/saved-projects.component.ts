// import {Component, OnInit} from '@angular/core';
// import {UserProfileApiCallerService} from "../../../../api-caller/user-profile-api-caller.service";
// import {BasicProjectData} from "../../../../models/basic-project-data";
//
// @Component({
//   selector: 'app-saved-projects',
//   templateUrl: './saved-projects.component.html',
//   styleUrls: ['./saved-projects.component.css']
// })
// export class SavedProjectsComponent implements OnInit {
//
//   public projects?: BasicProjectData[];
//
//   constructor(private userProfileApiCaller: UserProfileApiCallerService) {
//
//   }
//
//   ngOnInit(): void {
//     this.userProfileApiCaller.getSavedProjects().subscribe((response) => {
//       if (response.projects !== undefined) {
//         this.projects = [...response.projects];
//         this.projects.forEach(project => {
//           if (project.mainPicture === "") {
//             project.mainPicture = "assets/perfectProjectsDefaultPicture.png";
//           } else {
//             project.mainPicture = atob(project.mainPicture);
//           }
//           project.briefDescription = atob(project.briefDescription);
//         });
//       }
//     });
//   }
//
// }
