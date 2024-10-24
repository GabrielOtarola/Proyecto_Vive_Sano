import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Eliminado el uso de DatabaseService
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
    this.apiService.getUserByUsername(username).subscribe(users => {
      const user = users[0];
      if (user && user.password === password) {
        alert('Inicio de sesión exitoso.');
        localStorage.setItem('username', username);
        this.navCtrl.navigateForward('/home');
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    });
  }

  loginWithGoogle() {
    alert('Funcionalidad de Google Login no implementada.');
  }
}
