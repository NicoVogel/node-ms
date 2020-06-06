import { Injectable } from '@angular/core';
import { _Event } from './models/_Event';
import { HttpClient } from '@angular/common/http';
import { eventServiceURL } from './config';


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
    return this.http.post<any>(`${eventServiceURL}/`, { title: event.title, description: event.description });
  }

  registerEvent(eventId: string, accountId: string) {
    return this.http.post<any>(`${eventServiceURL}/register`, { eventId, accountId });
  }
}
