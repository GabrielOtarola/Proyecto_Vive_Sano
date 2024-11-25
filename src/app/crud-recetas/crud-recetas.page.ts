import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-recetas',
  templateUrl: './crud-recetas.page.html',
  styleUrls: ['./crud-recetas.page.scss'],
})
export class CrudRecetasPage implements OnInit {
  recetaForm: FormGroup;
  recetas: any[] = [];
  editMode = false;
  editRecetaId: number | null = null;

  constructor(private formBuilder: FormBuilder, private dbService: DatabaseService, private router: Router) {
    this.recetaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadRecetas(); // Cargar las recetas desde SQLite
  }

  async loadRecetas() {
    this.recetas = await this.dbService.getRecetas(); // Cargar recetas desde SQLite
    console.log('Recetas cargadas desde SQLite:', this.recetas);
  }

  async onSubmit() {
    if (this.recetaForm.invalid) {
      return;
    }

    const { nombre, descripcion } = this.recetaForm.value;

    if (this.editMode && this.editRecetaId !== null) {
      await this.dbService.updateReceta(this.editRecetaId, nombre, descripcion);
      console.log('Receta actualizada');
    } else {
      await this.dbService.addReceta(nombre, descripcion);
      console.log('Receta añadida');
    }

    this.recetaForm.reset();
    this.editMode = false;
    this.editRecetaId = null;
    this.loadRecetas(); // Recargar las recetas después de guardar
  }

  editReceta(receta: any) {
    this.recetaForm.setValue({
      nombre: receta.nombre,
      descripcion: receta.descripcion,
    });
    this.editMode = true;
    this.editRecetaId = receta.id;
  }

  async deleteReceta(id: number) {
    await this.dbService.deleteReceta(id);
    console.log('Receta eliminada');
    this.loadRecetas(); // Recargar las recetas después de eliminar
  }

  handleBackButton() {
    this.router.navigate(['/home']);
  }
}
