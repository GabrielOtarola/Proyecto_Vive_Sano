import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutinaEjerciciosPage } from './rutina-ejercicios.page';

const routes: Routes = [
  {
    path: '',
    component: RutinaEjerciciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutinaEjerciciosPageRoutingModule {}
