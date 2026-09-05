import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  signUp(userData:any) {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  login(userData:any){
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, userData);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/refresh-token`, { refreshToken: refreshToken });
  }
}
