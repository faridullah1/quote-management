import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableAction, TableConfig, TableSignal } from 'app/shared/generic-table/models';
import { Subject } from 'rxjs';
import { AdminAddFormComponent } from './../admin-form/admin-form.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class AdminUsersComponent {
	tableConfig: TableConfig;
	actions = new Subject<TableAction>();

	constructor(private dialog: MatDialog)
	{
		this.tableConfig = {
			title: 'Admin Users',
			slug: 'users',
			primaryKey: 'userId',

			showAdd: true,
			showSearch: true,

			searchColumn: 'name',

			rowActions: [
				{ name: 'edit', title: 'Edit', action: 'OnEdit' },
				{ name: 'delete', title: 'Delete', action: 'OnDelete' },
				{ name: 'approve', title: 'Approve', action: 'OnApprove' },
				{ name: 'disApprove', title: 'Disapprove', action: 'OnDisapprove' }
			],

			where: { column: 'type', op: 'eq', search: ['Super_Admin', 'Admin', 'Employee']},

			columns: [
				{ name: 'name', title: 'Name' },
				{ name: 'email', title: 'Email' },
				{ name: 'mobileNumber', title: 'Mobile Number' },
				{ name: 'type', title: 'Group Type' },
				{ name: 'isSuperAdmin', title: 'Super Admin', format: 'boolean' },
				{ name: 'isAdmin', title: 'Admin', format: 'boolean' },
				{ name: 'createdAt', title: 'Date Created', format: 'datetime' },
			]
		};
	}

	onTableSignal(ev: TableSignal): void {
		switch(ev.type) {
			case 'OpenForm':
				this.onHandleUser();
				break;

			case 'OnEdit':
				this.onHandleUser(ev.row);
				break;
		}
	}

	onHandleUser(row = null): void {
		const dialog = this.dialog.open(AdminAddFormComponent, {
			width: '40%',
			maxHeight: '90%',
			height: '90%'
		});

		if (row) {
			dialog.componentInstance.id = row.userId;
		}

		dialog.afterClosed().subscribe((resp: boolean) => {
			if (resp) {
				this.actions.next({ type: 'reload'});
			}
		});
	}
}
