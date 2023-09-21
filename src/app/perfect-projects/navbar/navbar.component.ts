import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AccessApiCallerService} from "../../api-caller/access-api-caller.service";
import {ToastService} from "../../services/toast.service";
import {ToastType} from "../../enums/toast-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService,
              private accessApiCaller: AccessApiCallerService,
              private toast: ToastService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public getUsername() {
    return this.auth.getUsername();
  }

  public onSignOut(){
    this.accessApiCaller.signOut().subscribe((response)=>{
      console.log(response);
        if (response.success){
          this.toast.showMessage("You were signed out", ToastType.INFO);
          this.auth.cleanAuthorization();
          this.router.navigate(["/"]);
        }
    });
  }
}
