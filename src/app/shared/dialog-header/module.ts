import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/modules/material/material.module';

import { DialogHeaderComponent } from './dialog-header.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	],
	exports: [DialogHeaderComponent],
	declarations: [DialogHeaderComponent],
})
export class DialogHeaderModule { }
