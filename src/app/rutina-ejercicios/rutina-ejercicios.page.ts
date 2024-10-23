import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Ejercicio {
  nombre: string;
  duracion: number;
}

interface Rutina {
  nombre: string;
  ejercicios: Ejercicio[];
}

@Component({
  selector: 'app-rutina-ejercicios',
  templateUrl: './rutina-ejercicios.page.html',
  styleUrls: ['./rutina-ejercicios.page.scss'],
})
export class RutinaEjerciciosPage implements OnDestroy {
  rutinas: Rutina[] = [
    {
      nombre: 'Rutina de Calentamiento',
      ejercicios: [
        { nombre: 'Calentamiento', duracion: 10 },
        { nombre: 'Estiramiento', duracion: 10 },
      ],
    },
    {
      nombre: 'Rutina de Fuerza',
      ejercicios: [
        { nombre: 'Flexiones', duracion: 10 },
        { nombre: 'Sentadillas', duracion: 10 },
      ],
    },
    {
      nombre: 'Rutina de Cardio',
      ejercicios: [
        { nombre: 'Correr en el lugar', duracion: 10 },
        { nombre: 'Saltos de tijera', duracion: 10 },
      ],
    },
    {
      nombre: 'Rutina de Abdominales',
      ejercicios: [
        { nombre: 'Abdominales cortos', duracion: 10 },
        { nombre: 'Plancha', duracion: 10 },
      ],
    },
    {
      nombre: 'Rutina de Estiramiento',
      ejercicios: [
        { nombre: 'Estiramiento de piernas', duracion: 10 },
        { nombre: 'Estiramiento de brazos', duracion: 10 },
      ],
    },
  ];

  ejercicioActual: Ejercicio | null = null;
  indiceEjercicioActual: number = 0; // Agregar índice para los ejercicios
  tiempoRestante: number = 0;
  progreso: number = 0;
  temporizador: any;
  rutinaCompletada: boolean = false;
  estaPausada: boolean = false;
  ejercicioIniciado: boolean = false;
  mensajeFinal: string = '';

  constructor(private navCtrl: NavController) {}

  seleccionarRutina(rutina: Rutina) {
    this.indiceEjercicioActual = 0; // Reiniciar el índice de ejercicios
    this.ejercicioActual = rutina.ejercicios[this.indiceEjercicioActual];
    this.tiempoRestante = this.ejercicioActual.duracion;
    this.rutinaCompletada = false;
    this.ejercicioIniciado = false;
    this.estaPausada = false;
    this.mensajeFinal = '';
  }

  iniciarRutina() {
    if (!this.ejercicioActual) return;
    this.ejercicioIniciado = true;
    this.mensajeFinal = '';

    this.temporizador = setInterval(() => {
      if (!this.estaPausada) {
        this.tiempoRestante--;
        this.progreso = (this.ejercicioActual!.duracion - this.tiempoRestante) / this.ejercicioActual!.duracion;

        if (this.tiempoRestante <= 0) {
          clearInterval(this.temporizador);
          this.avanzarAlSiguienteEjercicio(); // Avanzar al siguiente ejercicio
        }
      }
    }, 1000);
  }

  avanzarAlSiguienteEjercicio() {
    const rutinaSeleccionada = this.rutinas.find(rutina =>
      rutina.ejercicios.includes(this.ejercicioActual!)
    );

    if (rutinaSeleccionada && this.indiceEjercicioActual < rutinaSeleccionada.ejercicios.length - 1) {
      // Avanza al siguiente ejercicio
      this.indiceEjercicioActual++;
      this.ejercicioActual = rutinaSeleccionada.ejercicios[this.indiceEjercicioActual];
      this.tiempoRestante = this.ejercicioActual.duracion;
      this.iniciarRutina(); // Iniciar el siguiente ejercicio automáticamente
    } else {
      // Rutina completada, detener el temporizador y no reiniciar
      clearInterval(this.temporizador);  // Asegúrate de detener el temporizador
      this.rutinaCompletada = true;
      this.ejercicioIniciado = false;
      this.ejercicioActual = null;
    }
}

  pausarRutina() {
    this.estaPausada = true;
  }

  reanudarRutina() {
    this.estaPausada = false;
  }

  detenerRutina() {
    clearInterval(this.temporizador);
    this.rutinaCompletada = false;
    this.ejercicioIniciado = false;
    this.mensajeFinal = 'Ejercicio incompleto';
    this.ejercicioActual = null;
  }

  volverALista() {
    this.ejercicioActual = null;
    this.rutinaCompletada = false;
    this.ejercicioIniciado = false;
    this.mensajeFinal = '';
  }

  handleBackButton() {
    if (this.ejercicioActual) {
      this.volverALista();
    } else {
      this.navCtrl.navigateBack('/home');
    }
  }

  getImageForExercise(nombre: string): string {
    const images: { [key: string]: string } = {
      'Calentamiento': 'assets/img/calentamiento.gif',
      'Estiramiento': 'assets/img/estiramiento.gif',
      'Flexiones': 'assets/img/flexiones.gif',
      'Sentadillas': 'assets/img/sentadillas.gif',
      'Correr en el lugar': 'assets/img/correr en el lugar.gif',
      'Saltos de tijera': 'assets/img/saltos de tijera.gif',
      'Abdominales cortos': 'assets/img/abdominales cortos.gif',
      'Plancha': 'assets/img/plancha.gif',
      'Estiramiento de piernas': 'assets/img/estiramiento de piernas.gif',
      'Estiramiento de brazos': 'assets/img/estiramiento de brazos.gif'
    };

    return images[nombre] || 'assets/img/default.gif';
  }

  ngOnDestroy() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
  }
}
