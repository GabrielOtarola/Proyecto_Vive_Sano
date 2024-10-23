import { Component, OnInit } from '@angular/core';
import { NavController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  constructor(private navCtrl: NavController, private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.iniciarAnimacion();  // Llama a la función para iniciar la animación al cargar la página
  }

  // Función para manejar el botón de retroceso
  handleBackButton() {
    this.navCtrl.navigateBack('/home'); // Navegar a la página de inicio
  }

  // Función para iniciar animación
  iniciarAnimacion() {
    const element = document.querySelector('.recetas-container');  // Selecciona el contenedor de recetas
    if (element) {  // Verifica si el elemento existe para evitar el error
      const animacion = this.animationCtrl.create()
        .addElement(element)  // Selecciona el elemento contenedor
        .duration(1000)  // Duración de la animación (1 segundo)
        .easing('ease-in-out')  // Efecto de suavizado
        .fromTo('opacity', '0', '1')  // Cambia la opacidad de 0 (invisible) a 1 (visible)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)');  // Desliza de izquierda a derecha

      animacion.play();  // Inicia la animación
    }
  }
}