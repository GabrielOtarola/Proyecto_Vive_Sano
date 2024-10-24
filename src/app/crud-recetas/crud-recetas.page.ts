import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';  // Importar DatabaseService
import { NavController } from '@ionic/angular'; // Importa NavController

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

  constructor(
    private fb: FormBuilder,
    private dbService: DatabaseService,  // Inyectar DatabaseService
    private navCtrl: NavController // Inyecta NavController
  ) { }

  ngOnInit() {
    // Inicializa el formulario primero para asegurarse de que esté disponible
    this.recetaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });

    // Luego inicializa la base de datos
    this.dbService.initDB().then(() => {
      this.loadRecetas();
    }).catch(error => {
      console.error('Error al inicializar la base de datos:', error);
    });
  }

  async loadRecetas() {
    const recetas = await this.dbService.getRecetas();
    this.recetas = recetas || [];
  }

  async onSubmit() {
    if (this.recetaForm.valid) {
      const { nombre, descripcion } = this.recetaForm.value;
      if (this.editMode) {
        await this.dbService.updateReceta(this.recetaIdEdit, nombre, descripcion);
        this.editMode = false;
      } else {
        await this.dbService.addReceta(nombre, descripcion);
      }
      this.recetaForm.reset();
      this.loadRecetas();
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

  async deleteReceta(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
      await this.dbService.deleteReceta(id);
      this.loadRecetas();
    }
  }

  handleBackButton() {
    this.navCtrl.back(); // Navega a la página anterior
  }
}
