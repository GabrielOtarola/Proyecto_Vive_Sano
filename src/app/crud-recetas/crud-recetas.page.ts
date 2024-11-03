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
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadRecetas();
  }

  async loadRecetas() {
    this.recetas = await this.dbService.getRecetas();
    console.log('Recetas cargadas:', this.recetas);
  }

  onSubmit() {
    if (this.recetaForm.invalid) {
      return;
    }

    const { nombre, descripcion } = this.recetaForm.value;

    if (this.editMode && this.editRecetaId !== null) {
      this.dbService.updateReceta(this.editRecetaId, nombre, descripcion)
        .then(() => {
          console.log('Receta actualizada');
          this.loadRecetas();
        });
    } else {
      this.dbService.addReceta(nombre, descripcion)
        .then(() => {
          console.log('Receta añadida');
          this.loadRecetas();
        });
    }

    this.recetaForm.reset();
    this.editMode = false;
    this.editRecetaId = null;
  }

  editReceta(receta: any) {
    this.recetaForm.setValue({
      nombre: receta.nombre,
      descripcion: receta.descripcion
    });
    this.editMode = true;
    this.editRecetaId = receta.id;
  }

  deleteReceta(id: number) {
    this.dbService.deleteReceta(id)
      .then(() => {
        console.log('Receta eliminada');
        this.loadRecetas();
      });
  }

  handleBackButton() {
    this.router.navigate(['/home']);
  }
}
