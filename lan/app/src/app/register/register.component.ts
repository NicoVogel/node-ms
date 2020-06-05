import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error;
  registrationForm = this.formBuilder.group({
    type: "users",
    name: ['', Validators.required],
    password: ['', Validators.required],
    members: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  });

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {

  }

  get members() {
    return this.registrationForm.get('members') as FormArray;
  }

  addTeamMember() {
    this.members.push(this.formBuilder.control(''));
    console.log(this.registrationForm.value['type'])
  }
  removeTeamMember() {
    this.members.removeAt(this.members.length - 1);
  }

  onSubmit(registrationData): void {
    this.authenticationService.register(registrationData.type, registrationData.name, registrationData.password)
      .pipe(first())
      .subscribe(
        data => { this.router.navigate(["/"]); },
        error => {
          this.error = error.error.message;
        }
      )
  }
}
