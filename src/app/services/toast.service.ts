import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ToastType} from "../enums/toast-type";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {
  }

  public showMessage = ((message: string, type: ToastType) => {
    let toast = this.toastr.show().toastRef;
    toast.componentInstance.message = message;
    toast.componentInstance.type = type;

    setTimeout(()=>{
      toast.close();
    },3000);
  });
}
