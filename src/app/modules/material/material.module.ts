import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

const modules: any[] = [
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule,
	MatCardModule,
	MatCheckboxModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatDividerModule
];

@NgModule({
  declarations: [],
  imports: [ ...modules ],
  exports: [ ...modules ]
})
export class MaterialModule { }
