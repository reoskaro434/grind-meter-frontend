import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public username: string = "";

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.username = this.auth.getUsername();
  }
}
