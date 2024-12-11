import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes personalizados
import { AppComponent } from './app.component';
import { BienvenidaModalComponent } from './bienvenida-modal/bienvenida-modal.component';
import { SplashScreenModule } from './splash-screen/splash-screen.module'; // Importar el módulo del SplashScreenComponent
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de que esta línea esté presente

@NgModule({
  declarations: [
    AppComponent,                 // Componente principal de la aplicación
    BienvenidaModalComponent      // Componente del modal de bienvenida
  ],
  imports: [
    BrowserModule,                // Soporte para la ejecución en navegadores
    IonicModule.forRoot(),        // Inicialización de Ionic
    AppRoutingModule,             // Configuración de las rutas de la aplicación
    ReactiveFormsModule,          // Módulo para trabajar con formularios reactivos
    BrowserAnimationsModule,      // Animaciones del navegador
    IonicStorageModule.forRoot(), // Configuración de Ionic Storage
    HttpClientModule,             // HTTP para comunicación con servidores
    SplashScreenModule            // Importar el SplashScreenModule para registrar el componente de splash
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Estrategia de rutas de Ionic
    SQLite                        // Servicio para trabajar con SQLite
  ],
  bootstrap: [AppComponent],      // Punto de entrada de la aplicación
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite elementos personalizados en los componentes
})
export class AppModule {}
