import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatCardModule, // Añadir MatCardModule para usar <mat-card>
    MatButtonModule // Añadir MatButtonModule si usas botones de Angular Material
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
