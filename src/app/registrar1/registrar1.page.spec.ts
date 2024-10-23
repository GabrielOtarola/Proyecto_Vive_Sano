import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrar1Page } from './registrar1.page';

describe('Registrar1Page', () => {
  let component: Registrar1Page;
  let fixture: ComponentFixture<Registrar1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Registrar1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});