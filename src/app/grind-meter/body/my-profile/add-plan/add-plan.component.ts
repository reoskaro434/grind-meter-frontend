import {Component, OnInit} from '@angular/core';
import {map} from "rxjs";
import {ToastService} from "../../../../services/toast.service";
import {ToastType} from "../../../../enums/toast-type";
import {NgForm} from "@angular/forms";
import {v4} from 'uuid';
import {PlanApiCallerService} from "../../../../api-caller/plan-api-caller.service";
import {Plan, PlanState} from "../../../../models/plan";

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  planName: string = ""

  constructor(private planApiCaller: PlanApiCallerService,
              private toast: ToastService)
  {}
  public ngOnInit(): void {
  }
  public onSubmit(addExerciseForm: NgForm) {
    const planName = this.planName;

    addExerciseForm.control.reset();

    const exercise: Plan = {
      id: v4(),
      name: planName,
      state: PlanState.Inactive
    };

    this.planApiCaller.addPlan(exercise).pipe(map((response)=>{
      if (response) {
        this.toast.showMessage(`Added: ${planName}`, ToastType.SUCCESS);
      }
    })).subscribe();
  }

}
