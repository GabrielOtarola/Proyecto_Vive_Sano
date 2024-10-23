import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de agregar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { Login1PageRoutingModule } from './login1-routing.module';
import { Login1Page } from './login1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // Agrega esto
    Login1PageRoutingModule
  ],
  declarations: [Login1Page]
})
export class Login1PageModule {}
