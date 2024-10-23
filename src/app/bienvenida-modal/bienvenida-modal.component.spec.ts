import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { BienvenidaModalComponent } from './bienvenida-modal.component';

describe('BienvenidaModalComponent', () => {
  let component: BienvenidaModalComponent;
  let fixture: ComponentFixture<BienvenidaModalComponent>;
  let modalController: ModalController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BienvenidaModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [ModalController] // Proveedor del ModalController para las pruebas
    }).compileComponents();

    fixture = TestBed.createComponent(BienvenidaModalComponent);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController); // Inyecta ModalController para simular su comportamiento
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss modal', () => {
    spyOn(modalController, 'dismiss'); // Espía el método 'dismiss' del modalController
    component.dismiss();
    expect(modalController.dismiss).toHaveBeenCalled(); // Verifica que el modal fue cerrado
  });

  it('should display the correct username', () => {
    component.username = 'Gabriel';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('¡Bienvenido, Gabriel!');
  });
});

