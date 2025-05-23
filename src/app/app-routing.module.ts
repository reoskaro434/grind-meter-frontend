import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";
import {GrindMeterComponent} from "./grind-meter/grind-meter.component";
import {ExerciseReportComponent} from "./grind-meter/body/my-profile/exercise-report/exercise-report.component";
import {SignUpComponent} from "./grind-meter/body/sign-up/sign-up.component";
import {SignInComponent} from "./grind-meter/body/sign-in/sign-in.component";
import {NotFoundComponent} from "./grind-meter/body/not-found/not-found.component";
import {VerifyAccountComponent} from "./grind-meter/body/verify-account/verify-account.component";
import {MyProfileComponent} from "./grind-meter/body/my-profile/my-profile.component";
import {StartPageComponent} from "./grind-meter/body/start-page/start-page.component";
import {
  StatisticsComponent
} from "./grind-meter/body/my-profile/statistics/statistics.component";
import {ExercisesComponent} from "./grind-meter/body/my-profile/exercises/exercises.component";
import {
  ExerciseStatisticTableComponent
} from "./grind-meter/body/my-profile/statistics/exercise-statistic-table/exercise-statistic-table.component";
import {ShowPlansComponent} from "./grind-meter/body/my-profile/plans/show-plans/show-plans.component";
import {EditPlanComponent} from "./grind-meter/body/my-profile/plans/edit-plan/edit-plan.component";
import {PlansComponent} from "./grind-meter/body/my-profile/plans/plans.component";
import {EditExerciseComponent} from "./grind-meter/body/my-profile/statistics/edit-exercise/edit-exercise.component";
import {AccountComponent} from "./grind-meter/body/my-profile/account/account.component";
import {ChartsComponent} from "./grind-meter/body/my-profile/statistics/charts/charts.component";

const routes: Routes = [
  {
    path: '', component: GrindMeterComponent, children: [
      {path: '', component: StartPageComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'sign-in', component: SignInComponent},
      {
        path: ':username', canActivate: [AuthGuardService], component: MyProfileComponent,
        children: [
          {path: '', component: ExerciseReportComponent},
          {path: 'daily-report', component: ExerciseReportComponent},
          {path: 'account', component: AccountComponent},
          {path: 'statistics', component: StatisticsComponent, children: [
                {path: 'show/:exerciseId', component: ExerciseStatisticTableComponent},
                {path: 'edit/:exerciseId', component: EditExerciseComponent},
                {path: 'charts/:exerciseId', component: ChartsComponent},
            ]},
          {path: 'exercises', component: ExercisesComponent},
          {path: 'plans', component: PlansComponent, children: [
              {path: 'show-plans', component: ShowPlansComponent},
              {path: 'edit/:planId', component: EditPlanComponent},
              {path: 'report/:planId', component: ExerciseReportComponent}
            ]},

        ]
      },
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
