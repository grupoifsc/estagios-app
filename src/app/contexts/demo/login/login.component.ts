import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginRequestBody } from '../auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink,
    ButtonModule, InputGroupAddonModule, InputGroupModule, InputTextModule,
    PasswordModule, ProgressSpinnerModule

   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    public loading: LoadingService
  ) {}

  
  form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  })


  public logout() : void {
    this.authService.logoutAndRedirect();
  }

  public submit() : void {
    const redirectUrl : string = this.route.snapshot.queryParams['goTo'] ?? '/demo';
    const form = this.form.getRawValue();
    let loginRequest : LoginRequestBody = {
      email: form.email!,
      password: form.password!
    }
    this.authService.loginAndRedirect(loginRequest, redirectUrl).subscribe({
      next: response => console.log(response),
      error: err => this.loginError(err)
    });
  }


  private loginError(err: any) : void {
    console.log(err);    
  }

}
