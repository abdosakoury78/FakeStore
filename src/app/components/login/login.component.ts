import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  successMessage = '';
  errorMessage = '';

  loginForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])

  });

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({

      next: (response) => {

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.successMessage = 'Login successful!';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);

      },

      error: (error) => {

        console.error('Login failed:', error);

        this.errorMessage =
          error.error?.message?.[0] ||
          'Invalid email or password. Please try again.';

      }

    });
  }
}