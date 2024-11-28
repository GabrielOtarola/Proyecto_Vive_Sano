import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private apiUrl = 'https://6744f4b2b4e2e04abea436a9.mockapi.io/db/recetas';  // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  // Obtener todas las recetas
  getRecetas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una receta por ID
  getReceta(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva receta
  createReceta(receta: any): Observable<any> {
    return this.http.post(this.apiUrl, receta);
  }

  // Actualizar una receta existente
  updateReceta(id: number, receta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, receta);
  }

  // Eliminar una receta
  deleteReceta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
