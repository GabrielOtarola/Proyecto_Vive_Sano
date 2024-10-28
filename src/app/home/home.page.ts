import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BienvenidaModalComponent } from '../bienvenida-modal/bienvenida-modal.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  welcomeMessage: string = '';
  isLoggedIn: boolean = false;
  username: string = ''; // Almacena el nombre del usuario

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.setWelcomeMessage();
    this.notificationService.scheduleWaterReminder();
  }

  onMenuOpen() {
    this.welcomeMessage = 'Bienvenido';
  }

  async setWelcomeMessage() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.isLoggedIn = true;
      this.username = storedUsername;
      this.welcomeMessage = `Bienvenido, ${this.username}`;
      await this.presentWelcomeModal(this.username); // Mostrar el modal de bienvenida
    } else {
      this.isLoggedIn = false;
      this.welcomeMessage = 'Bienvenido';
    }
  }

  // Mostrar un modal de bienvenida al usuario
  async presentWelcomeModal(username: string) {
    const modal = await this.modalController.create({
      component: BienvenidaModalComponent,
      cssClass: 'my-custom-class',
      componentProps: { username }
    });
    return await modal.present();
  }

  // Navegar a la página de inicio de sesión
  goToLogin() {
    this.navCtrl.navigateForward('/login1');
  }

  // Cerrar sesión y permanecer en la página actual
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('username'); // Eliminar los datos del usuario del localStorage
    this.welcomeMessage = 'Bienvenido'; // Actualizar el mensaje de bienvenida para usuarios no logueados
    this.navCtrl.navigateForward('/login1'); // Redirigir al usuario a la página de inicio de sesión
  }

  // Navegar a la página de Rutinas de Ejercicio
  goToRutinaEjercicios() {
    this.navCtrl.navigateForward('/rutina-ejercicios');
  }

  // Navegar a la página de Recetas Saludables
  goToRecetas() {
    this.navCtrl.navigateForward('/recetas');
  }
}
