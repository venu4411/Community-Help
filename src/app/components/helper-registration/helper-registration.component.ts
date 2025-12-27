import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-helper-registration',
  templateUrl: './helper-registration.component.html',
  styleUrls: ['./helper-registration.component.css']
})
export class HelperRegistrationComponent {

  form = {
    fullName: '',
    contact: '',
    username: '',
    password: '',
    gender: 'male',
    age: null as number | null,
    qualification: '',
    location: '',
    priceType: 'Hourly',
    price: null as number | null
  };

  helpOptions = [
    { label: 'Electrician', checked: false },
    { label: 'Plumber', checked: false },
    { label: 'Carpenter', checked: false },
    { label: 'Cleaner', checked: false },
    { label: 'Painter', checked: false },
    { label: 'Mechanic', checked: false },
    { label: 'Cook', checked: false },
    { label: 'Other', checked: false }
  ];

  otherHelp = '';
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  back() {
    this.router.navigate(['/']);
  }

  register() {
    const selected = this.helpOptions
      .filter(h => h.checked)
      .map(h => h.label);

    if (selected.includes('Other') && this.otherHelp.trim()) {
      selected.push(this.otherHelp.trim());
    }

    const payload = {
      ...this.form,
      helpType: selected.join(', ')
    };

    this.auth.registerHelper(payload).subscribe({
      next: () => {
        this.successMessage = 'Registration successful';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}
