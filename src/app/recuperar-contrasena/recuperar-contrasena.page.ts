import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importar NavController
import { ApiService } from '../services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements AfterViewInit {
  emailSent = false;

  constructor(private navCtrl: NavController, private apiService: ApiService) {} // Inyectar NavController

  ngAfterViewInit() {
    // Configurar el evento de validación del formulario con jQuery
    $('#recoverForm').submit((event) => {
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
        this.apiService.isEmailRegistered(email).subscribe((isRegistered: boolean) => {
          if (isRegistered) {
            $('#emailSuccess').text('El correo de recuperación ha sido enviado.');
            this.emailSent = true;
            this.navCtrl.navigateForward('/login');
          } else {
            $('#emailError').text('El correo no está registrado.');
          }
        });
      }
    });
  }
}

