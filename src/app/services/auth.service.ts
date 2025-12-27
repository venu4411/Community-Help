import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /* ================= USER REGISTER ================= */
  registerUser(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  /* ================= HELPER REGISTER ================= */
  registerHelper(data: any) {
    return this.http.post(`${this.API}/helper/register`, data);
  }

  /* ================= LOGIN ================= */
  userLogin(data: { username: string; password: string }) {
    return this.http.post(`${this.API}/login/user`, data);
  }

  helperLogin(data: { username: string; password: string }) {
    return this.http.post(`${this.API}/login/helper`, data);
  }

  /* ================= PROFILE UPDATE ================= */
  updateUser(id: number, role: string, data: any) {
    return this.http.put(
      `${this.API}/update/${role.toLowerCase()}/${id}`,
      data
    );
  }

  /* ================= SESSION ================= */
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }
  searchHelpers(query: string) {
    return this.http.get<any[]>(
      `http://localhost:3000/api/search/helpers?q=${query}`
    );
  }

  searchSuggestions(query: string) {
    return this.http.get<string[]>(
      `http://localhost:3000/api/search/suggestions?q=${query}`
    );
  }
  getHelpersByType(type: string) {
    return this.http.get<any[]>(`${this.API}/helpers/${type}`);
  }
  
  


}
