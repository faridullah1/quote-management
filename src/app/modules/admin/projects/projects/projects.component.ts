import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConfig, TableAction, TableSignal } from 'app/shared/generic-table/models';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ApiService } from 'app/api.service';
import { GenericApiResponse } from 'app/models';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
	tableConfig: TableConfig;
	actions = new Subject<TableAction>();

	constructor(private dialog: MatDialog,
				private apiService: ApiService,
				private confirmationService: FuseConfirmationService)
	{
		this.tableConfig = {
			title: 'Projects',
			slug: 'projects',
			primaryKey: 'projectId',

			showAdd: false,
			showSearch: true,

			searchColumn: 'name',

			rowActions: [
				{ name: 'edit', title: 'Edit', action: 'OnEdit' },
				{ name: 'delete', title: 'Delete', action: 'OnDelete' },
				{ name: 'approve', title: 'Approve', action: 'OnApprove' },
				{ name: 'disApprove', title: 'Disapprove', action: 'OnDisapprove' }
			],

			columns: [
				{ name: 'name', title: 'Project Name' },
				{ name: 'image', title: 'Image', format: 'image' },
				{ name: 'location', title: 'Location' },
				{ name: 'type', title: 'Project Type' },
				{ name: 'description', title: 'Description' },
				{ name: 'isApproved', title: 'Is Approved', format: 'boolean' },
				{ name: 'createdAt', title: 'Date Created', format: 'datetime' },
			]
		};
	}

	onTableSignal(ev: TableSignal): void {
		switch(ev.type) {
			case 'OnApprove':
				this.onApproveProject(ev.row);
				break;
		}
	}

	onApproveProject(project: any): void {
		const dialog = this.confirmationService.open({
			title: 'Approve Project?'
		});

		dialog.afterClosed().subscribe((action: 'confirmed' | 'cancelled') => {
			if (action === 'confirmed') {
				this.apiService.patch(`projects/${project.projectId}`, {}).subscribe({
					next: (resp: GenericApiResponse) => {
						this.actions.next({ type: 'reload' });
					},
					error: (error: any) => console.log(error)
				});
			}
		});
	}
}
