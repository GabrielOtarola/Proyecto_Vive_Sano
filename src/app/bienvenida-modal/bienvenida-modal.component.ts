import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida-modal',
  templateUrl: './bienvenida-modal.component.html',
  styleUrls: ['./bienvenida-modal.component.scss'],
})
export class BienvenidaModalComponent {
  @Input() username: string = ''; // Inicializa 'username' para evitar errores si no se pasa un valor

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss(); // Cierra el modal
  }
}
