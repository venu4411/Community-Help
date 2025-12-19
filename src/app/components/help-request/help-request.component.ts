import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-help-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './help-request.component.html',
  styleUrls: ['./help-request.component.css']
})
export class HelpRequestComponent {

  submitted = false;
  helpRequestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.helpRequestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      attachmentUrl: ['']
    });
  }

  submitRequest(): void {
    this.submitted = true;

    if (this.helpRequestForm.invalid) {
      return;
    }

    console.log('Help request submitted (UI only)');
  }
}
