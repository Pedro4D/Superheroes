import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { DynamicChartsComponent } from './dynamic-charts/dynamic-charts.component';

@NgModule({
  declarations: [ChipComponent, DynamicDialogComponent, DynamicChartsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ChipComponent, DynamicDialogComponent, DynamicChartsComponent],
})
export class SharedModule {}
