import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule],   // ✅ REQUIRED for *ngFor
  templateUrl: './request-list.component.html'
})
export class RequestListComponent {

  requests = [
    {
      title: 'Grocery Assistance',
      category: 'Grocery',
      location: 'Hyderabad'
    },
    {
      title: 'Plumbing Work',
      category: 'Plumbing',
      location: 'Chennai'
    }
  ];

}
