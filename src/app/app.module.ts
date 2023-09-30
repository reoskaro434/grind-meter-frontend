import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectComponent} from './shared-components/project/project.component';
import {ProjectThumbnailComponent} from './shared-components/project/project-thumbnail/project-thumbnail.component';
import {ProjectDescriptionComponent} from './shared-components/project/project-description/project-description.component';
import {ProjectStatsComponent} from './shared-components/project/project-stats/project-stats.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {InterceptorService} from "./services/interceptor.service";
import {CookieService} from 'ngx-cookie-service';
import {BodyComponent} from "./perfect-projects/body/body.component";
import {PerfectProjectsComponent} from "./perfect-projects/perfect-projects.component";
import {NavbarComponent} from "./perfect-projects/navbar/navbar.component";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {ToastComponent} from "./perfect-projects/body/toast/toast.component";
import {SignUpComponent} from "./perfect-projects/body/sign-up/sign-up.component";
import {SignInComponent} from "./perfect-projects/body/sign-in/sign-in.component";
import {DailyWorkoutReportComponent} from "./perfect-projects/body/my-profile/daily-workout-raport/daily-workout-report.component";
import { UpdateExerciseMenuComponent } from './perfect-projects/body/my-profile/daily-workout-raport/update-exercise-menu/update-exercise-menu.component';
import {VerifyAccountComponent} from "./perfect-projects/body/verify-account/verify-account.component";
import {MyProfileComponent} from "./perfect-projects/body/my-profile/my-profile.component";
import {StartPageComponent} from "./perfect-projects/body/start-page/start-page.component";
import {
  GeneralStatisticsComponent
} from "./perfect-projects/body/my-profile/general-statistics/general-statistics.component";
import {NotFoundComponent} from "./perfect-projects/body/not-found/not-found.component";



@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectThumbnailComponent,
    ProjectDescriptionComponent,
    ProjectStatsComponent,
    BodyComponent,
    PerfectProjectsComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    DailyWorkoutReportComponent,
    UpdateExerciseMenuComponent,
    VerifyAccountComponent,
    MyProfileComponent,
    ToastComponent,
    StartPageComponent,
    GeneralStatisticsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastComponent: ToastComponent,
    }),
  ],
  providers: [
    [CookieService],
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    provideAnimations(),
    provideToastr()
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
