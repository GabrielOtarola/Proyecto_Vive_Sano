import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutinaEjerciciosPage } from './rutina-ejercicios.page';

describe('RutinaEjerciciosPage', () => {
  let component: RutinaEjerciciosPage;
  let fixture: ComponentFixture<RutinaEjerciciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaEjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
