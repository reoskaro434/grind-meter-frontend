import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectComponent} from '../../old-project/project/project.component';
import {ProjectThumbnailComponent} from '../../old-project/project/project-thumbnail/project-thumbnail.component';
import {ProjectDescriptionComponent} from '../../old-project/project/project-description/project-description.component';
import {ProjectStatsComponent} from '../../old-project/project/project-stats/project-stats.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {InterceptorService} from "./services/interceptor.service";
import {CookieService} from 'ngx-cookie-service';
import {BodyComponent} from "./grind-meter/body/body.component";
import {GrindMeterComponent} from "./grind-meter/grind-meter.component";
import {NavbarComponent} from "./grind-meter/navbar/navbar.component";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {ToastComponent} from "./grind-meter/body/toast/toast.component";
import {SignUpComponent} from "./grind-meter/body/sign-up/sign-up.component";
import {SignInComponent} from "./grind-meter/body/sign-in/sign-in.component";
import {DailyWorkoutReportComponent} from "./grind-meter/body/my-profile/daily-workout-raport/daily-workout-report.component";
import { UpdateExerciseMenuComponent } from './grind-meter/body/my-profile/daily-workout-raport/update-exercise-menu/update-exercise-menu.component';
import {VerifyAccountComponent} from "./grind-meter/body/verify-account/verify-account.component";
import {MyProfileComponent} from "./grind-meter/body/my-profile/my-profile.component";
import {StartPageComponent} from "./grind-meter/body/start-page/start-page.component";
import {
  GeneralStatisticsComponent
} from "./grind-meter/body/my-profile/general-statistics/general-statistics.component";
import {NotFoundComponent} from "./grind-meter/body/not-found/not-found.component";



@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectThumbnailComponent,
    ProjectDescriptionComponent,
    ProjectStatsComponent,
    BodyComponent,
    GrindMeterComponent,
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
