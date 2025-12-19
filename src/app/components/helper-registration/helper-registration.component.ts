import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helper-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './helper-registration.component.html',
  styleUrls: ['./helper-registration.component.css']
})
export class HelperRegistrationComponent {

  helper = {
    fullName: '',
    contact: '',
    username: '',
    password: '',
    helps: [] as string[],
    otherHelp: '',
    role: 'Helper'
  };

  helpOptions = [
    'Plumbing',
    'Electrician',
    'Grocery',
    'Tutoring',
    'Cleaning',
    'Others'
  ];

  isRegistered = false;

  constructor(private router: Router) {}

  toggleHelp(help: string): void {
    const index = this.helper.helps.indexOf(help);

    if (index === -1) {
      this.helper.helps.push(help);
    } else {
      this.helper.helps.splice(index, 1);
      if (help === 'Others') {
        this.helper.otherHelp = '';
      }
    }
  }

  registerHelper(): void {
    if (
      this.helper.fullName &&
      this.helper.contact &&
      this.helper.username &&
      this.helper.password &&
      this.helper.helps.length > 0
    ) {
      this.isRegistered = true;
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
