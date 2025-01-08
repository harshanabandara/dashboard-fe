import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalUsers: number = 10;
  totalActiveUsers: number = 2;
  lastUserAdded: string = "Harshana Bandara"
}
