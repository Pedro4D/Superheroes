import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroesComponent } from './super-heroes.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [SuperHeroesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [SuperHeroesComponent],
})
export class SuperHeroesModule {}
