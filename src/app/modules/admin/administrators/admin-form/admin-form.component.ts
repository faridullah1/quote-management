import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'app/api.service';
import { Helpers } from 'app/shared/helpers';
import Validation from 'app/shared/validators';
import { GenericApiResponse } from '../../../../models';


@Component({
  selector: 'admin-user-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminAddFormComponent implements OnInit {
	adminTypes: string[] = ['Admin', 'Employee'];
	id: string;
	theForm: FormGroup;
	disableSaveBtn = false;

	constructor(private apiService: ApiService,
				private fb: FormBuilder,
				private dialogRef: MatDialogRef<AdminAddFormComponent>)
	{
		this.theForm = fb.group({
			name: [null, [Validators.required]],
			mobileNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required]],
			confirmPassword: [null, [Validators.required]],
			type: ['Admin', [Validators.required]],
			isAdmin: [true]
		}, { validators: [Validation.match('password', 'confirmPassword')]});
	}

	ngOnInit(): void {
		if (this.id) {
			this.theForm.removeControl('password');
			this.theForm.removeControl('confirmPassword');
			this.getUser();
		}
	}

	getUser(): void {
		this.apiService.get(`users/${this.id}`).subscribe({
			next: (resp: GenericApiResponse) => {
				this.theForm.patchValue(resp.data['user']);
			},
			error: (error: any) => console.error(error)
		});
	}

	numericOnly(ev: KeyboardEvent): boolean {
		return Helpers.numericOnly(ev);
	}

	onSave(): void {
		const payload = this.theForm.value;
		payload.fromAdmin = true;
		payload.confirmPassword = undefined;
		this.disableSaveBtn = true;

		if (this.id) {
			this.apiService.patch(`users/${this.id}`, payload).subscribe({
				next: () => {
					this.disableSaveBtn = false;
					this.dialogRef.close(true);
				},
				error: () => this.disableSaveBtn = false
			});
		}
		else {
			this.apiService.post('users', payload).subscribe({
				next: () => {
					this.disableSaveBtn = false;
					this.dialogRef.close(true);
				},
				error: () => this.disableSaveBtn = false
			});
		}
	}
}
