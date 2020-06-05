import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/User';
import { HttpClient } from '@angular/common/http';
import { accountServiceURL } from './config';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // behaviosubject: new subscribe get currently stored value
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(name: string, password: string) {
    return this.http.post<any>(`${accountServiceURL}/users/authenticate`, { name, password }).pipe(map(user => {
      // store user and jwt in local storage
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
