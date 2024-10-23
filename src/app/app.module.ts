import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importar el IonicStorageModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importación del módulo de animaciones
import { BienvenidaModalComponent } from './bienvenida-modal/bienvenida-modal.component'; // Importación del componente modal

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaModalComponent // Asegúrate de declarar el componente aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(), // Configuración del almacenamiento
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Proveedor de la estrategia de rutas
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añadir CUSTOM_ELEMENTS_SCHEMA para permitir componentes de Ionic
})
export class AppModule {}

