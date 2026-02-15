import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/tasks']);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  updateUser(id: string, data: { email?: string; password?: string; role?: string }) {
    return this.http.put<{ id: string; email: string }>(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id}`);
  }
}
