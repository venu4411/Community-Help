import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    username: '',
    password: ''
  };

  error = '';
  showPassword = false;
  loginAsAdmin = false;   // ✅ NEW

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleLoginType() {
    this.loginAsAdmin = !this.loginAsAdmin;
    this.error = '';
    this.formData = { username: '', password: '' };
  }

  login() {

    if (!this.formData.username || !this.formData.password) {
      this.error = 'Username and password required';
      return;
    }

    /* ================= ADMIN LOGIN ================= */
    if (this.loginAsAdmin) {
      this.http.post<any>(
        'http://localhost:3000/api/admin/login',
        this.formData
      ).subscribe({
        next: res => {
          localStorage.setItem('admin', JSON.stringify(res.admin));
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.error = 'Invalid admin credentials';
        }
      });
      return;
    }

    /* ================= USER LOGIN ================= */
    this.auth.userLogin(this.formData).subscribe({
      next: (res: any) => {
        this.auth.setUser(res.user);
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
