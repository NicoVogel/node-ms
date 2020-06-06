import { Injectable } from '@angular/core';
import { _Event } from './models/_Event';
import { HttpClient } from '@angular/common/http';
import { eventServiceURL, billingServiceURL } from './config';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {
  }

  fetchEventList() {
    return this.http.get<_Event[]>(`${eventServiceURL}/`);
  }

  createEvent(event: _Event) {
    return this.http.post<any>(`${eventServiceURL}/`, { title: event.title, description: event.description, price: event.price });
  }

  registerEvent(eventId: string, accountId: string) {
    return this.http.post<any>(`${eventServiceURL}/register`, { eventId, accountId });
  }
  confirmEvent(eventId: string, accountId: string) {
    return this.http.post<any>(`${eventServiceURL}/confirm`, { eventId, accountId });
  }

  payBilling(eventId: string, accountId: string) {
    console.log(eventId, accountId)
    return this.http.post<any>(`${billingServiceURL}/pay`, { eventId, accountId });
  }

  fetchBilling(eventId: string, accountId: string) {
    return this.http.get<any>(`${billingServiceURL}/${accountId}/${eventId}`);
  }
}
