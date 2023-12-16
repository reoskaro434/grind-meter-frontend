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
    const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

    this.username = this.auth.getUsername()
  }
}
