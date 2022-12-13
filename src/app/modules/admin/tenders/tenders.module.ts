import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TendersComponent } from './tenders/tenders.component';
import { Route, Router, RouterModule } from '@angular/router';

const routes: Route[] = [
    {
        path     : '',
        component: TendersComponent
    }
];

@NgModule({
  declarations: [
    TendersComponent
  ],
  imports: [
    CommonModule,
	RouterModule.forChild(routes)
  ]
})
export class TendersModule { }
