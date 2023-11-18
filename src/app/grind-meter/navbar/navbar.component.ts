import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AccessApiCallerService} from "../../api-caller/access-api-caller.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username = this.auth.getUsername();
  isNavbarVisible: boolean = false;
  isUserOptionVisible: boolean = false;
  blink: boolean = false;

  constructor(private auth: AuthService,
              private accessApiCaller: AccessApiCallerService,
              private router: Router) {
  }

  public onSignOut(){
    this.blink = true;
    this.isNavbarVisible = false;
    this.isUserOptionVisible = false;

    this.accessApiCaller.signOut().subscribe((response)=>{
        if (response){
          this.auth.cleanAuthorization();
          this.blink = false;
          this.router.navigate(["/"]).then();
        }
    });
  }

  public toggleNavbar(){
    this.isNavbarVisible = !this.isNavbarVisible;
    if (!this.isNavbarVisible) {
      this.isUserOptionVisible = false;
    }
  }

  public toggleUserOption(){
    this.isUserOptionVisible = !this.isUserOptionVisible;
  }

  isSigned(){
    return this.auth.getUsername() !== "";
  }
}
