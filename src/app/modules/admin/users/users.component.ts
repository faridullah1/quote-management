import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConfig, TableAction, TableSignal } from 'app/shared/generic-table/models';
import { UserAddFormComponent } from './user-add-form/user-add-form.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
	tableConfig: TableConfig;
	actions = new Subject<TableAction>();

	constructor(private dialog: MatDialog)
	{
		this.tableConfig = {
			title: 'Users',
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

			where: { column: 'type', op: 'ne', search: ['Super_Admin', 'Admin', 'Employee'] },

			columns: [
				{ name: 'name', title: 'Name' },
				{ name: 'email', title: 'Email' },
				{ name: 'mobileNumber', title: 'Mobile Number' },
				{ name: 'isAccountActive', title: 'Is Account Active', format: 'boolean' },
				{ name: 'type', title: 'Group Type' },
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
		const dialog = this.dialog.open(UserAddFormComponent, {
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
