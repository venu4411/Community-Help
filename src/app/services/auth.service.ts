import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:3000/api';
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      this.currentUser = stored ? JSON.parse(stored) : null;
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
  /* ================= REGISTER ================= */
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

}
