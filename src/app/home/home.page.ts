import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  welcomeMessage: string = 'Bienvenido';
  username: string | undefined;
  isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { username: string };
    this.username = state?.username;

    // Determinar si el usuario está autenticado
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit() {
    if (this.username) {
      this.welcomeMessage = `Bienvenido, ${this.username}`;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login1']);
  }

  goToLogin() {
    this.router.navigate(['/login1']);
  }

  goToRutinaEjercicios() {
    this.router.navigate(['/rutina-ejercicios']);
  }

  goToRecetas() {
    this.router.navigate(['/recetas']);
  }
}
