import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: MainLayoutComponent, canActivate:[authGuard],children: [
        {path: '', component: HomeComponent},
        {path: 'categories', component: CategoryComponent}
    ]},
    {path: 'auth', component: AuthLayoutComponent, children: [
        {path: '', component: LoginComponent},
        {path: 'signup', component: SignupComponent}
    ]}
];
