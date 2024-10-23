import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { CrudRecetasPageRoutingModule } from './crud-recetas-routing.module';

import { CrudRecetasPage } from './crud-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Importa ReactiveFormsModule aquí
    IonicModule,
    CrudRecetasPageRoutingModule
  ],
  declarations: [CrudRecetasPage]
})
export class CrudRecetasPageModule {}
