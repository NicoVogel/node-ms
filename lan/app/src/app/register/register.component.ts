import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm = this.formBuilder.group({
    type: "single",
    name: ['', Validators.required],
    password: ['', Validators.required],
    members: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  });

  constructor(private formBuilder: FormBuilder) {
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
    console.log(registrationData);
    this.registrationForm.reset();
  }
}
