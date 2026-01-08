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

  /* ================= USER / HELPER LOGIN ================= */
  userLogin(data: { username: string; password: string }) {
    return this.http.post(`${this.API}/login/user`, data);
  }

  helperLogin(data: { username: string; password: string }) {
    return this.http.post(`${this.API}/login/helper`, data);
  }

  /* ================= ADMIN LOGIN ================= */
  adminLogin(data: { username: string; password: string }) {
    return this.http.post(`${this.API}/login/admin`, data);
  }

  /* ================= PROFILE UPDATE ================= */
  updateUser(id: number, role: string, data: any) {
    return this.http.put(
      `${this.API}/update/${role.toLowerCase()}/${id}`,
      data
    );
  }

  /* ================= USER SESSION ================= */
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }

  /* ================= ADMIN SESSION ================= */
  setAdmin(admin: any) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem('admin') || 'null');
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('admin');
  }

  logoutAdmin() {
    localStorage.removeItem('admin');
  }

  /* ================= SEARCH / HELPERS ================= */
  searchHelpers(query: string) {
    return this.http.get<any[]>(
      `${this.API}/search/helpers?q=${query}`
    );
  }

  searchSuggestions(query: string) {
    return this.http.get<string[]>(
      `${this.API}/search/suggestions?q=${query}`
    );
  }

  getHelpersByType(type: string) {
    return this.http.get<any[]>(`${this.API}/helpers/${type}`);
  }

  getTasksByUsername(username: string) {
    return this.http.get<any[]>(
      `${this.API}/payments/user/${username}`
    );
  }
/* ================= ADMIN USERS ================= */
  getAllUsers() {
    return this.http.get<any[]>(`${this.API}/admin/users`);
  }

  updateUserByAdmin(id: number, data: any) {
    return this.http.put(
      `${this.API}/admin/users/${id}`, // ✅ FIXED PATH
      data
    );
  }


  /* ================= ADMIN HELPERS ================= */
  getAllHelpers() {
    return this.http.get<any[]>(`${this.API}/admin/helpers`);
  }

  updateHelperByAdmin(id: number, data: any) {
    return this.http.put(
      `${this.API}/admin/helpers/${id}`,
      data
    );
  }

  /* ================= ADMIN BOOKINGS ================= */
  getAllBookings() {
    return this.http.get<any[]>(`${this.API}/admin/bookings`);
  }



  /* ================= TASKS ================= */
  /* ================= HELPER TASK REQUESTS ================= */

  getPendingForHelper() {
    return this.http.get<any[]>(
      `${this.API}/payments/helper/pending`
    );
  }

  /* ================= HELPER TASKS ================= */
  getHelperTasks(helpername: string) {
    return this.http.get<any[]>(
      `${this.API}/payments/helper/${helpername}`
    );
  }

  /* ================= ACCEPT TASK ================= */
  acceptTask(id: number, helpername: string) {
    return this.http.put(
      `${this.API}/payments/accept/${id}`,
      { helpername }
    );
  }


  /* ================= CALENDAR ================= */
  getCalendar(role: 'user' | 'helper', name: string) {
    return this.http.get<any[]>(
      `${this.API}/calendar/${role}/${name}`
    );
  }

  checkAvailability(data: any) {
    return this.http.post<any>(
      `${this.API}/check-availability`,
      data
    );
  }





  





/* ================= USER TASKS ================= */


  // User
  getUserTasks(username: string) {
    return this.http.get<any[]>(
      `${this.API}/payments/user/${username}`
    );
  }


  /* ================= CALENDAR ================= */

  // User calendar
  getUserCalendar(username: string) {
    return this.http.get<any[]>(
      `${this.API}/calendar/user/${username}`
    );
  }

  // Helper calendar
  getHelperCalendar(helpername: string) {
    return this.http.get<any[]>(
      `${this.API}/calendar/helper/${helpername}`
    );
  }


  /* ================= CHAT ================= */

  /* ================= CHAT ================= */
  getChatContacts(username: string, role: string) {
    return this.http.get<any[]>(
      `${this.API}/chat/contacts`,
      {
        params: {
          username,
          role
        }
      }
    );
  }


  getChatHistory(u1: string, u2: string) {
    return this.http.get<any[]>(
      `${this.API}/chat/history?u1=${u1}&u2=${u2}`
    );
  }

  sendMessage(data: any) {
    return this.http.post(`${this.API}/chat/send`, data);
  }



  /* ================= VERIFY PIN ================= */
  verifyPin(taskId: number, pin: string) {
    return this.http.post(
      `${this.API}/payments/verify-pin`,
      { taskId, pin }
    );
  }



  


}
