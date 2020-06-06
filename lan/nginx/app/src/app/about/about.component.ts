import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  debugUser(): string {
    return JSON.stringify(this.authenticationService.currentUserValue, null, 4);
  }
}
