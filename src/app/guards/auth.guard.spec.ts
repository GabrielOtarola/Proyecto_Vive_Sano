import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Importa Storage
import { BehaviorSubject } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockStorage: { get: () => Promise<any> };
  let mockRouter: { navigate: () => void };

  beforeEach(() => {
    mockStorage = {
      get: () => Promise.resolve(true), // Simula un valor por defecto
    };

    mockRouter = {
      navigate: () => {} // Simula la función de navegación
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Simula el router
      providers: [
        AuthGuard,
        { provide: Storage, useValue: mockStorage }, // Usa un Storage falso
        { provide: Router, useValue: mockRouter } // Usa un Router falso
      ]
    });

    guard = TestBed.inject(AuthGuard); // Inyecta el guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is logged in', async () => {
    mockStorage.get = () => Promise.resolve(true); // Usuario autenticado
    const canActivate = await guard.canActivate();
    expect(canActivate).toBe(true); // Verifica que permita la navegación
  });

  it('should prevent navigation if user is not logged in', async () => {
    mockStorage.get = () => Promise.resolve(false); // Usuario no autenticado
    const canActivate = await guard.canActivate();
    expect(canActivate).toBe(false); // Verifica que bloquea la navegación
  });
});

