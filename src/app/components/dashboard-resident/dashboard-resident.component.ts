import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-resident',
  standalone: true,     // ✅ REQUIRED
  imports: [CommonModule],
  templateUrl: './dashboard-resident.component.html'
})
export class DashboardResidentComponent {}
