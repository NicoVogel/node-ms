import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { _Event } from '../models/_Event';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventList: _Event[];
  userId: string;
  createEventForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.eventService.fetchEventList().subscribe(data => this.eventList = data);
    this.userId = this.authenticationService.currentUserValue.id;
  }

  checkConfirmAvailable(event: _Event) {
    return event.registered.filter(participant => participant._id === this.userId).length > 0;
  }
  confirmAvailable(eventId: string) {
    this.eventService.confirmEvent(eventId, this.userId).subscribe(data => console.log(data));
  }

  onSubmit(createEventData): void {
    this.createEventForm.reset();
    this.eventService.createEvent(createEventData).subscribe(data => console.log(data));
  }

  register(eventId: string) {
    this.eventService.registerEvent(eventId, this.userId).subscribe(data => console.log(data));
  }

}
