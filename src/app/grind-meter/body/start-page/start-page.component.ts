import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-project-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  username: string = ""

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername()
  }
}
