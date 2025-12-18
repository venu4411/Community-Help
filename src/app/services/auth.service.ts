import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api'; // backend URL

  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  /* ================= REGISTER ================= */
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  registerHelper(helperData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/helper/register`, helperData);
  }

  /* ================= LOGIN ================= */
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, loginData);
  }

  /* ================= SESSION ================= */
  setUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      this.currentUser = stored ? JSON.parse(stored) : null;
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
}
