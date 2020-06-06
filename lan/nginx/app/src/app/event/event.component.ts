import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { _Event } from '../models/_Event';
import { AuthenticationService } from '../authentication.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  billingData;
  closeResult = '';
  eventList: _Event[];
  userId: string;
  createEventForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private authenticationService: AuthenticationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.eventService.fetchEventList().subscribe(data => this.eventList = data);
    this.userId = this.authenticationService.currentUserValue.id;
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  checkConfirmAvailable(event: _Event) {
    return event.registered.filter(participant => participant._id === this.userId).length > 0;
  }

  checkRegistrationComplete(event: _Event) {
    if (event.registered.filter(participant => participant._id === this.userId).length === 1) {
      const registration = event.registered.filter(participant => participant._id === this.userId)[0];
      return registration.registrationComplete;
    }
  }

  confirmAvailable(eventId: string, content) {
    this.eventService.confirmEvent(eventId, this.userId).subscribe(data => console.log(data));
    this.eventService.fetchBilling(eventId, this.userId).subscribe(data => {
      this.billingData = data;
      this.open(content);
    })
  }

  payBill(billId: string) {
    // compound bill
    this.eventService.payBilling(billId.split('\'')[3], this.userId).subscribe(data => console.log(data));
  }

  onSubmit(createEventData): void {
    this.createEventForm.reset();
    this.eventService.createEvent(createEventData).subscribe(data => console.log(data));
  }

  register(eventId: string) {
    this.eventService.registerEvent(eventId, this.userId).subscribe(data => console.log(data));
  }

}
