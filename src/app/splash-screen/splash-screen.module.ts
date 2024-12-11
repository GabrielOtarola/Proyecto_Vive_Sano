import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SplashScreenComponent } from './splash-screen.component';

@NgModule({
  declarations: [SplashScreenComponent],
  imports: [
    CommonModule,
    IonicModule  // Importar IonicModule para usar componentes de Ionic
  ],
  exports: [SplashScreenComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Para permitir el uso de elementos personalizados
})
export class SplashScreenModule {}
