import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudRecetasPage } from './crud-recetas.page';

describe('CrudRecetasPage', () => {
  let component: CrudRecetasPage;
  let fixture: ComponentFixture<CrudRecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
