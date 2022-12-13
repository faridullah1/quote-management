import { CommonModule, DecimalPipe, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/modules/material/material.module';

import { FormatDataPipe } from '../generic-table/format.pipe';
import { TableComponent } from '../generic-table/table.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	declarations: [
		TableComponent,

        FormatDataPipe
	],
	exports: [
		TableComponent,
	],
	providers: [
		DatePipe,
		DecimalPipe
	]
})
export class GenericTableModule { }
