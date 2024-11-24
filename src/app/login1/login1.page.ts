import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { BienvenidaModalComponent } from '../bienvenida-modal/bienvenida-modal.component';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private modalController: ModalController // ModalController agregado
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.errors?.['required']) {
      return 'Este campo es obligatorio';
    }
    return '';
  }

  async onSubmit() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(async isAuthenticated => {
      if (isAuthenticated) {
        // Crear y mostrar el modal
        const modal = await this.modalController.create({
          component: BienvenidaModalComponent,
          componentProps: { username }, // Pasar el nombre de usuario al modal
        });
        await modal.present();

        // Redirigir después de cerrar el modal
        modal.onDidDismiss().then(() => {
          const navigationExtras = {
            state: { username },
          };
          this.navCtrl.navigateForward('/home', navigationExtras);
        });
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    });
  }

  loginWithGoogle() {
    // Implementación del método para iniciar sesión con Google
    console.log('Iniciando sesión con Google...');
    // Aquí puedes agregar la lógica para la autenticación con Google
  }
}
