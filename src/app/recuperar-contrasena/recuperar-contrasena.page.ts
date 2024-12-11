import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importar NavController
import { ApiService } from '../services/api.service';
import $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements AfterViewInit {
  emailSent = false;

  constructor(private navCtrl: NavController, private apiService: ApiService, private toastController: ToastController) {} // Inyectar NavController

  ngAfterViewInit() {
    // Configurar el evento de validación del formulario con jQuery
    $('#recoverForm').submit((event: JQuery.Event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado

      // Limpiar mensajes de error
      $('.error-message').text('');

      // Obtener el valor del campo email
      const email = $('#email').val() as string;

      let isValid = true;

      // Validación de email
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Si la validación es exitosa
      if (isValid) {
        this.apiService.isEmailRegistered(email).pipe(
          catchError(error => {
            console.error('Error al verificar el correo:', error);
            $('#emailError').text('Ocurrió un error al verificar el correo.');
            return of(false); // Devuelve un observable con valor falso para continuar el flujo
          })
        ).subscribe((isRegistered: boolean) => {
          if (isRegistered) {
            $('#emailSuccess').text('El correo de recuperación ha sido enviado.');
            this.emailSent = true;
            this.mostrarMensajeExito();
          } else {
            console.log('El correo no está registrado.');
            $('#emailError').text('El correo no está registrado.');
          }
        });
      }
    });
  }

  async mostrarMensajeExito() {
    const toast = await this.toastController.create({
      message: 'El correo de recuperación ha sido enviado.',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
