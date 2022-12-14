import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

const modules = [
  MatSliderModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  DragDropModule,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatDividerModule,
  MatChipsModule,
  MatListModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: [modules],
})
export class MaterialAngularModule {}
