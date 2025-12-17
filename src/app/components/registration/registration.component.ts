import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MockRoleService } from '../../services/mock-role.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  submitted = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: MockRoleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      location: ['', Validators.required],
      role: ['resident', Validators.required]
    });
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.roleService.setRole(this.form.value.role);

    if (this.form.value.role === 'resident') {
      this.router.navigate(['/resident/dashboard']);
    } else {
      this.router.navigate(['/helper/dashboard']);
    }
  }
}
