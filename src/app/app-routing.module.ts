import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";
import {GrindMeterComponent} from "./grind-meter/grind-meter.component";
import {DailyWorkoutReportComponent} from "./grind-meter/body/my-profile/daily-workout-raport/daily-workout-report.component";
import {SignUpComponent} from "./grind-meter/body/sign-up/sign-up.component";
import {SignInComponent} from "./grind-meter/body/sign-in/sign-in.component";
import {NotFoundComponent} from "./grind-meter/body/not-found/not-found.component";
import {VerifyAccountComponent} from "./grind-meter/body/verify-account/verify-account.component";
import {ProjectPageComponent} from "../../old-project/project-page/project-page.component";
import {MyProfileComponent} from "./grind-meter/body/my-profile/my-profile.component";
import {StartPageComponent} from "./grind-meter/body/start-page/start-page.component";
import {
  GeneralStatisticsComponent
} from "./grind-meter/body/my-profile/general-statistics/general-statistics.component";

const routes: Routes = [
  {
    path: '', component: GrindMeterComponent, children: [
      {path: '', component: StartPageComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'sign-in', component: SignInComponent},
      {
        path: 'my-profile', canActivate: [AuthGuardService], component: MyProfileComponent,
        children: [
          {path: '', component: GeneralStatisticsComponent},
          {path: 'todays-workout', component: DailyWorkoutReportComponent},
        ]
      },
      {path: 'project/:projectId', component: ProjectPageComponent},
      {path: 'verify-account/:username', component: VerifyAccountComponent},
      {path: 'not-found', component: NotFoundComponent},
      {path: '**', redirectTo: 'not-found'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
