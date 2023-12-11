import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {v4} from 'uuid';
import {PlanApiCallerService} from "../../../../../../api-caller/plan-api-caller.service";
import {Plan} from "../../../../../../models/plan";

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  planName: string = ""

  constructor(private planApiCaller: PlanApiCallerService)
  {}
  public ngOnInit(): void {
  }
  public onSubmit(addExerciseForm: NgForm) {
    const planName = this.planName;

    addExerciseForm.control.reset();

    const exercise: Plan = {
      id: v4(),
      name: planName,
      userId: "", // will be obtained in the backend
      exerciseIdList: []
    };

    this.planApiCaller.addPlan(exercise).subscribe((resp) => {
      window.location.reload();
    });
  }

}
