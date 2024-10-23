import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudRecetasPage } from './crud-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: CrudRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRecetasPageRoutingModule {}
