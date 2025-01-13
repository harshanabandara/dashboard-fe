import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user',
  imports: [UserFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user: User = { firstName: '', lastName: '', userId: 0 }

}
