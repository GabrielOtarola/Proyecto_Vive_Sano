import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedFlag = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<any[]>(`http://192.168.1.11:3000/users?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            this.isAuthenticatedFlag = true;
            return true;
          }
          this.isAuthenticatedFlag = false;
          return false;
        })
      );
  }

  logout(): void {
    this.isAuthenticatedFlag = false;
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }
}
