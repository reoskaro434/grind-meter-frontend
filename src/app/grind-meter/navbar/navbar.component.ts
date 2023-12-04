import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AccessApiCallerService} from "../../api-caller/access-api-caller.service";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  username = this.auth.getUsername();

  constructor(private auth: AuthService,
              private accessApiCaller: AccessApiCallerService,
              private router: Router) {
  }

  private getItemsForUser(): MenuItem[] {
    return [
      {
        label: 'Exercises'
      },
      {
        label: 'Plans'
      },
      {
        label: this.username,
        items: [
          {
            label: 'Sign Out',
            command: () => this.onSignOut(),
          }
        ]
      }
    ];
  }

  private getItemsForGuest(): MenuItem[] {
    return [
      {
        label: 'Sign In',
        routerLink: '/sign-in'
      },
      {
        label: 'Sign Up',
        routerLink: '/sign-up'
      }
    ];
  }

  ngOnInit() {
    if (this.username !== "") {
      this.items = this.getItemsForUser();
    } else {
      this.items = this.getItemsForGuest();
    }
  }

  public onSignOut() {
    this.accessApiCaller.signOut().subscribe((_) => {
      this.auth.cleanAuthorization();
      this.router.navigate(["/"]).then();
      this.items = this.getItemsForGuest()
    });
  }
}
