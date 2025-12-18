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
    role: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.loginUser(this.loginData).subscribe({
      next: (res: any) => {
        this.authService.setUser(res.user);
        this.router.navigate(['/']); // ✅ Landing page
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
