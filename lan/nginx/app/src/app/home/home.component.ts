import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName;
  constructor(private authenticationService: AuthenticationService) {
    this.userName = authenticationService.currentUserValue.name;
  }

  ngOnInit(): void {
  }

}
