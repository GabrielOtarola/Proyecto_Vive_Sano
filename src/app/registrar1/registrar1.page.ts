import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ApiService } from '../services/api.service'; // Asegúrate de importar ApiService
import { Camera, CameraResultType, CameraSource, CameraPermissionType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-registrar1',
  templateUrl: './registrar1.page.html',
  styleUrls: ['./registrar1.page.scss'],
})
export class Registrar1Page implements OnInit {
  registerForm!: FormGroup;
  profileImage: string = ''; // Inicializar con string vacío

  constructor(
    private fb: FormBuilder, 
    private navCtrl: NavController,
    private apiService: ApiService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\\d{4,}).+$')
      ]],
      age: ['', [Validators.required, Validators.min(14), Validators.max(100)]],
      height: ['', [Validators.required, Validators.min(100), Validators.max(280)]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required]
    });
  }

  async requestCameraPermissions() {
    if (Capacitor.getPlatform() !== 'web') {
      const permissions = await Camera.requestPermissions({
        permissions: ['camera', 'photos']
      });

      if (permissions.camera === 'granted' && permissions.photos === 'granted') {
        console.log('Permisos concedidos');
      } else {
        console.log('Permisos denegados');
      }
    } else {
      console.log('La cámara no está disponible en la web.');
    }
  }

  async selectImage() {
    await this.requestCameraPermissions();
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Acción:',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            this.getImage(CameraSource.Camera);
          }
        },
        {
          text: 'Seleccionar de la Galería',
          handler: () => {
            this.getImage(CameraSource.Photos);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async getImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: source // Aquí se especifica la fuente de la imagen
    });

    if (image.dataUrl) {
      this.profileImage = image.dataUrl;
    }
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const formData = {
        ...this.registerForm.value,
        profileImage: this.profileImage // Añadir la imagen de perfil al objeto de datos
      };
      this.apiService.addUser(formData).subscribe(
        () => {
          alert('Usuario registrado con éxito.');
          this.navCtrl.navigateForward('/login1');
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          alert('Hubo un problema al registrar el usuario.');
        }
      );
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }

  handleBackButton() {
    this.navCtrl.back();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.errors?.['required']) {
      return 'Este campo es obligatorio';
    }
    if (control?.errors?.['pattern']) {
      switch (field) {
        case 'username':
          return 'El nombre de usuario solo puede contener letras.';
        case 'password':
          return 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y al menos 4 dígitos.';
      }
    }
    if (control?.errors?.['email']) {
      return 'Por favor, introduce un correo electrónico válido.';
    }
    if (control?.errors?.['min']) {
      switch (field) {
        case 'age':
          return 'La edad mínima es 14 años.';
        case 'height':
          return 'La altura mínima es 100 cm.';
        case 'weight':
          return 'El peso mínimo es 30 kg.';
      }
    }
    if (control?.errors?.['max']) {
      switch (field) {
        case 'age':
          return 'La edad máxima es 100 años.';
        case 'height':
          return 'La altura máxima es 280 cm.';
        case 'weight':
          return 'El peso máximo es 200 kg.';
      }
    }
    return '';
  }
}
