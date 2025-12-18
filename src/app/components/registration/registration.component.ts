import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  registerUser(): void {
    if (
      this.user.fullName &&
      this.user.contact &&
      this.user.username &&
      this.user.password &&
      this.user.location
    ) {
      this.isRegistered = true;

      // reset form
      this.user = {
        fullName: '',
        contact: '',
        username: '',
        password: '',
        location: '',
        role: 'Resident'
      };
    }
  }

  goToHome(): void {
    this.router.navigate(['/']); // ✅ Landing page
  }
}
