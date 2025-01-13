import { Component, Input } from '@angular/core';
import { last } from 'rxjs';
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
  selector: 'app-new-user',
  imports: [UserFormComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  jsonData = { firstName: "Harshana", lastName: "" }
}
