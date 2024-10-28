import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {
    this.requestPermission();
  }

  async requestPermission() {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display === 'granted') {
      console.log('Permiso de notificaciones concedido');
    } else {
      console.error('Permiso de notificaciones no concedido');
    }
  }

  async scheduleWaterReminder() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Recordatorio de Hidratación',
          body: 'Es hora de beber agua para mantenerte hidratado.',
          id: 1,
          schedule: { on: { hour: 0, minute: 1 }, repeats: true },
          sound: 'beep.wav', // Asegúrate de tener este archivo en tu proyecto
        },
      ],
    });
  }
}


