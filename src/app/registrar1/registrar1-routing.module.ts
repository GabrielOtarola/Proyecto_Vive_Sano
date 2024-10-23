import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Registrar1Page } from './registrar1.page';

const routes: Routes = [
  {
    path: '',
    component: Registrar1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Registrar1PageRoutingModule {}
