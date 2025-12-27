import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-helper-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './helper-login.component.html',
  styleUrls: ['./helper-login.component.css']
})
export class HelperLoginComponent {

  formData = {
    username: '',
    password: ''
  };

  error = '';
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.auth.helperLogin(this.formData).subscribe({
      next: (res: any) => {
        this.auth.setUser(res.user);
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Invalid helper credentials';
      }
    });
  }
}
