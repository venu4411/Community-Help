import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule        // ✅ THIS FIXES ngModel
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user = {
    fullName: '',
    contact: '',
    location: '',
    username: '',
    password: '',
    role: 'Resident'
  };

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registerUser(): void {
    this.authService.registerUser(this.user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: () => {
        this.errorMessage = 'Registration failed';
        this.successMessage = '';
      }
    });
  }
}
