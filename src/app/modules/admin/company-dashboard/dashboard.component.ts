import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
	searchFC = new FormControl();
	actions = new Subject();
	search: string;

	constructor() { }

	ngOnInit(): void {
		this.searchFC.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((search: string) => {
			console.log('searrch =', search);
			this.actions.next({
				type: 'search', value: search
			});
		});
	}

	onCreateQuote(): void {
		this.actions.next({
			type: 'add', value: null
		});
	}
}
