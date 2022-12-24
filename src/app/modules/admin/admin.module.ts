import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';

import { AuthGuard } from 'app/core/auth/guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteDetailPageComponent } from './quote-detail-page/quote-detail-page.component';

const routes: Route[] = [
	{ path: '', component: DashboardComponent },
	{ path: 'new', component: QuoteDetailPageComponent, canActivate: [AuthGuard] },
	{ path: ':id', component: QuoteDetailPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),

		MaterialModule
	],
	declarations: [
		DashboardComponent,
		QuotesComponent,
		QuoteDetailPageComponent,
	],
})
export class AdminModule { }
