import { Component, OnInit } from '@angular/core';
import {ToastType} from "../../../enums/toast-type";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  message: string = "";
  type: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  isSuccess = () => {
   return this.type === ToastType.SUCCESS;
  }

  isError = () => {
    return this.type === ToastType.ERROR;
  }

  isInfo = () => {
    return this.type === ToastType.INFO;
  }
}
