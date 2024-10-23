import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';  // Para navegar

@Component({
  selector: 'app-crud-recetas',
  templateUrl: './crud-recetas.page.html',
  styleUrls: ['./crud-recetas.page.scss'],
})
export class CrudRecetasPage implements OnInit {
  recetaForm!: FormGroup;
  recetas: any[] = [];
  editMode: boolean = false;
  recetaIdEdit!: number;
  private apiUrl = 'http://localhost:3000/recetas';  // Ruta del json-server

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private navCtrl: NavController  // Inyectar NavController
  ) { }

  ngOnInit() {
    this.recetaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });

    this.loadRecetas();
  }

  loadRecetas() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.recetas = data;
    });
  }

  onSubmit() {
    if (this.recetaForm.valid) {
      if (this.editMode) {
        this.http.put(`${this.apiUrl}/${this.recetaIdEdit}`, this.recetaForm.value).subscribe(() => {
          this.recetaForm.reset();
          this.editMode = false;
          this.loadRecetas();
        });
      } else {
        this.http.post(this.apiUrl, this.recetaForm.value).subscribe(() => {
          this.recetaForm.reset();
          this.loadRecetas();
        });
      }
    }
  }

  editReceta(receta: any) {
    this.recetaForm.patchValue({
      nombre: receta.nombre,
      descripcion: receta.descripcion
    });
    this.recetaIdEdit = receta.id;
    this.editMode = true;
  }

  deleteReceta(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.loadRecetas();
      });
    }
  }

  // Método para retroceder
  handleBackButton() {
    this.navCtrl.back();  // Retrocede a la página anterior
  }
}

