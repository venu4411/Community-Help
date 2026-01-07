import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-helpers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-helpers.component.html',
  styleUrls: ['./admin-helpers.component.css']
})
export class AdminHelpersComponent implements OnInit {

  helpers: any[] = [];
  selectedHelper: any = null;
  showEdit = false;
  message = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHelpers();
  }

  loadHelpers() {
    this.auth.getAllHelpers().subscribe((res: any[]) => {
      this.helpers = res;
    });
  }

  editHelper(helper: any) {
    this.selectedHelper = {
        id: helper.id,                 
        full_name: helper.full_name,
        username: helper.username,
        contact: helper.contact || '',
        location: helper.location || '',
        gender: helper.gender || '',
        age: helper.age ?? null,
        qualification: helper.qualification || '',
        help_type: helper.help_type || '',
        price: helper.price ?? 0,
        review: helper.review || ''
    };
    this.showEdit = true;
  }

    saveChanges() {
        if (!this.selectedHelper?.id) {
            alert('Helper ID missing');
            return;
        }

        if (!this.selectedHelper.full_name || !this.selectedHelper.username) {
            alert('Full Name and Username are required');
            return;
        }

        this.auth.updateHelperByAdmin(
            this.selectedHelper.id,
            this.selectedHelper
        ).subscribe({
            next: () => {
            alert('✅ Helper updated successfully');
            this.showEdit = false;
            this.loadHelpers();
            },
            error: err => {
            console.error(err);
            alert('❌ Update failed (check backend log)');
            }
        });
    }


  cancel() {
    this.showEdit = false;
  }
  goBack() {
    this.router.navigate(['/admin']);
 }

}
