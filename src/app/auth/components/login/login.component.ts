import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState, Login } from '../../state/auth.state';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router)
  authService = inject(AuthService)
  store = inject(Store)
  userLogin() {
    const credentials = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    }
    console.log(this.loginForm.value)
    this.store.dispatch(new Login(credentials)).subscribe(() => {
      console.log("here")
      this.router.navigate(['/home'])
    })
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
}
