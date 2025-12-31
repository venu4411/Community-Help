import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  helpers: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.http.get<any[]>('http://localhost:3000/api/admin/users')
      .subscribe(res => this.users = res);

    this.http.get<any[]>('http://localhost:3000/api/admin/helpers')
      .subscribe(res => {
        this.helpers = res;
        this.loading = false;
      });
  }

  saveUser(user: any) {
    this.http.put(
      `http://localhost:3000/api/admin/user/${user.id}`,
      user
    ).subscribe(() => alert('User updated'));
  }

  saveHelper(helper: any) {
    this.http.put(
      `http://localhost:3000/api/admin/helper/${helper.id}`,
      helper
    ).subscribe(() => alert('Helper updated'));
  }
}
