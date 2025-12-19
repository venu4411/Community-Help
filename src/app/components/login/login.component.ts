import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username: '',
    password: '',
    role: '' // Resident / Helper
  };

  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.loginUser({
      username: this.loginData.username,
      password: this.loginData.password
    }).subscribe({
      next: (res: any) => {

        console.log('LOGIN RESPONSE 👉', res);

        const user = {
          id: res.user.id,
          fullName: res.user.full_name,
          contact: res.user.contact,
          location: res.user.location,
          role: res.user.role
        };

        this.authService.setUser(user);
        this.router.navigate(['/']); // landing page
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }


}
