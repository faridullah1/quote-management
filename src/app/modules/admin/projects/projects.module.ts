import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { Route, RouterModule } from '@angular/router';
import { GenericTableModule } from 'app/shared/generic-table/module';

const routes: Route[] = [
    {
        path     : '',
        component: ProjectsComponent
    }
];

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
	RouterModule.forChild(routes),

	GenericTableModule
  ]
})
export class ProjectsModule { }
