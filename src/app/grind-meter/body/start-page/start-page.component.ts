import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  username: string = ""

  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername()

    if (this.username !== "") {
      this.router.navigate([`${this.username}/plans/show-plans`]).then();
    }
  }
}
