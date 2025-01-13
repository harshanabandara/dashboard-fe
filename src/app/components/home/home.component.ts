import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { UserManagementComponent } from "../user-management/user-management.component";

@Component({
  selector: 'app-home',
  imports: [DashboardComponent, UserManagementComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
