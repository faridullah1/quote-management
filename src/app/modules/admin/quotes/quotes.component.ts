import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'app/models';
import { QuoteService } from 'app/quote.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
	@Input() actions: Subject<any>;

	allQuotes: Quote[] = [];
	quotes: Quote[] = [];

	constructor(private router: Router,
				private quoteService: QuoteService)
	{ }

	ngOnInit(): void {
		this.actions.subscribe((resp: any) =>
		{
			switch(resp.type) {
				case 'add':
					this.router.navigateByUrl('/quotes/new');
					break;

				case 'search':
					this.getAllQuotes(resp.value);
					break;
			}
		});

		this.getAllQuotes();
	}

	getAllQuotes(search: string | null = null): void {
		this.allQuotes = this.quoteService.getAllQuotes();
		this.quotes = this.allQuotes;

		if (search) {
			this.quotes = this.allQuotes.filter(quote => (search === quote.id || quote.name.toLowerCase().includes(search)));
		}
	}

	onCreateQuote(): void {
		this.router.navigateByUrl('/quotes/new');
	}

	onRowClick(quote: Quote): void {
		this.router.navigate(['/quotes', quote.id]);
	}
}
