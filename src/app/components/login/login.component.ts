import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  isLoggedIn = false;

  constructor(private router: Router) {}

  login(): void {
    if (
      this.loginData.username &&
      this.loginData.password &&
      this.loginData.role
    ) {
      this.isLoggedIn = true;
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

}
