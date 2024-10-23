import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Registrar1PageRoutingModule } from './registrar1-routing.module';

import { Registrar1Page } from './registrar1.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Registrar1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Registrar1Page]
})
export class Registrar1PageModule {}
