import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  successMessage = '';
  errorMessage = '';
  signupForm = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

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

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    const user = {
      ...this.signupForm.value,
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png'
    };

    this.authService.signUp(user).subscribe({

      next: (response) => {
        this.successMessage = 'Account created successfully!';

        this.signupForm.reset();
        setTimeout(() => {
        this.router.navigate(['/auth']);}, 3000);
      },

      error: (error) => {
        this.errorMessage =
          error.error?.message?.[0] ||
          'Something went wrong. Please try again.';
      }

    });

  }

}