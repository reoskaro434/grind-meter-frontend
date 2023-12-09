import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {ExerciseReportComponent} from "./grind-meter/body/my-profile/exercise-report/exercise-report.component";
import {
  LiftExerciseMenuComponent
} from './grind-meter/body/my-profile/exercise-report/lift-exercise-menu/lift-exercise-menu.component';
import {VerifyAccountComponent} from "./grind-meter/body/verify-account/verify-account.component";
import {MyProfileComponent} from "./grind-meter/body/my-profile/my-profile.component";
import {StartPageComponent} from "./grind-meter/body/start-page/start-page.component";
import {
  StatisticsComponent
} from "./grind-meter/body/my-profile/statistics/statistics.component";
import {NotFoundComponent} from "./grind-meter/body/not-found/not-found.component";
import {AddExerciseComponent} from "./grind-meter/body/my-profile/exercises/add-exercise/add-exercise.component";
import {ExercisesComponent} from "./grind-meter/body/my-profile/exercises/exercises.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table'
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DatePickerComponent} from './grind-meter/body/date-picker/date-picker.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import { ExerciseStatisticTableComponent } from './grind-meter/body/my-profile/statistics/exercise-statistic-table/exercise-statistic-table.component';
import {AddPlanComponent} from "./grind-meter/body/my-profile/plans/show-plans/add-plan/add-plan.component";
import {ShowPlansComponent} from "./grind-meter/body/my-profile/plans/show-plans/show-plans.component";
import { EditPlanComponent } from './grind-meter/body/my-profile/plans/edit-plan/edit-plan.component';
import { PlansComponent } from './grind-meter/body/my-profile/plans/plans.component';
import {PickListModule} from "primeng/picklist";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {PasswordModule} from "primeng/password";
import {AccordionModule} from "primeng/accordion";
import { TreeModule } from 'primeng/tree';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {ToolbarModule} from "primeng/toolbar";
import {ToastModule} from "primeng/toast";
import { InputNumberModule } from 'primeng/inputnumber';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { SpinnerComponent } from './grind-meter/shared-components/spinner/spinner.component';
import {TreeTableModule} from "primeng/treetable";
import { GmIconComponent } from './grind-meter/navbar/gm-icon/gm-icon.component';
import {PaginatorModule} from "primeng/paginator";

export const DateFormats = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    GrindMeterComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    ExerciseReportComponent,
    LiftExerciseMenuComponent,
    VerifyAccountComponent,
    MyProfileComponent,
    ToastComponent,
    StartPageComponent,
    StatisticsComponent,
    NotFoundComponent,
    AddExerciseComponent,
    AddPlanComponent,
    ExercisesComponent,
    DatePickerComponent,
    ExerciseStatisticTableComponent,
    ShowPlansComponent,
    EditPlanComponent,
    PlansComponent,
    SpinnerComponent,
    GmIconComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            toastComponent: ToastComponent,
        }),
        NgbModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        PickListModule,
        ButtonModule,
        TableModule,
        TagModule,
        MenubarModule,
        InputTextModule,
        InputTextareaModule,
        CheckboxModule,
        RadioButtonModule,
        PasswordModule,
        AccordionModule,
        TreeModule,
        ConfirmDialogModule,
        DialogModule,
        ToolbarModule,
        ToastModule,
        InputNumberModule,
        ProgressSpinnerModule,
        TreeTableModule,
        PaginatorModule
    ],
  providers: [
    [CookieService],
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    provideAnimations(),
    provideToastr(),
    {provide: MAT_DATE_LOCALE, useValue: undefined}
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
