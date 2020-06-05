import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  returnUrl: string;
  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // extract return url from url, otherwise redirect to home
    this.returnUrl = this.route.snapshot.queryParams['/returnUrl'] || '/';
  }
  onSubmit(loginData): void {
    console.log(loginData);
    this.loginForm.reset();
    this.authenticationService.login(loginData.name, loginData.password)
      .pipe(first())
      .subscribe(
        data => { this.router.navigate([this.returnUrl]); },
        error => {
          this.error = error.error.message;
        }
      )
  }
}
