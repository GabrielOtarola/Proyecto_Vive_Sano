import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://6744f4b2b4e2e04abea436a9.mockapi.io/db/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}`);
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}`, user, { headers });
  }

  isEmailRegistered(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}?email=${email}`).pipe(
      tap(response => console.log('Respuesta del servidor:', response))
    );
  }
}
