import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user = {
    fullName: '',
    contact: '',
    username: '',
    password: '',
    location: '',
    role: 'Resident'
  };

  isRegistered = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registerUser(): void {
    this.authService.registerUser(this.user).subscribe({
      next: () => {
        this.isRegistered = true;
      },
      error: (err: any) => {
        this.errorMessage = err?.error?.message || 'Registration failed';
      }
    });
  }


  goToHome(): void {
    this.router.navigate(['/']);
  }
}
