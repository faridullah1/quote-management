import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, NgModule, Type } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { CompanyDashboardComponent } from './company-dashboard/dashboard.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteDetailPageComponent } from './quote-detail-page/quote-detail-page.component';
import { SupplierDashboardComponent } from './supplier-dashboard/dashboard.component';
import { User } from 'app/models';

import jwt_decode  from 'jwt-decode';

const routes: Route[] = [
	{ path: '', component: getDashboardComponent() },
	{ path: 'new', component: QuoteDetailPageComponent, canActivate: [AuthGuard] },
	{ path: ':id', component: QuoteDetailPageComponent, canActivate: [AuthGuard] }
];

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getDashboardComponent(): Type<Component> {
	const token = localStorage.getItem('accessToken');
	const { company } = jwt_decode(token) as User;

	if (company) {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return <Type<Component>>CompanyDashboardComponent;
	}
	else {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return <Type<Component>>SupplierDashboardComponent;
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),

		MaterialModule
	],
	declarations: [
		CompanyDashboardComponent,
		SupplierDashboardComponent,
		QuotesComponent,
		QuoteDetailPageComponent,
	],
})
export class AdminModule { }
