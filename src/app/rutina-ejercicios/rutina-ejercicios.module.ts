import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutinaEjerciciosPageRoutingModule } from './rutina-ejercicios-routing.module';

import { RutinaEjerciciosPage } from './rutina-ejercicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutinaEjerciciosPageRoutingModule
  ],
  declarations: [RutinaEjerciciosPage]
})
export class RutinaEjerciciosPageModule {}
