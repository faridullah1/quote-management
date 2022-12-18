import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Quote } from 'app/models';
import { QuoteService } from 'app/quote.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
	allQuotes: Quote[] = [];
	quotes: Quote[] = [];
	searchFC = new FormControl();

	constructor(private router: Router,
				private quoteService: QuoteService)
	{
		this.searchFC.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((search: string) => {
			this.getAllQuotes(search.toLowerCase());
		});
	}

	ngOnInit(): void {
		this.getAllQuotes();
	}

	getAllQuotes(search: string | null = null): void {
		this.allQuotes = this.quoteService.quotes;
		this.quotes = this.allQuotes;

		if (search) {
			this.quotes = this.allQuotes.filter(quote => (search === quote.id || quote.name.toLowerCase().includes(search)));
		}
	}

	onCreateQuote(): void {
		this.router.navigateByUrl('/dashboard/quote/new');
	}

	onRowClick(quote: Quote): void {
		this.router.navigate(['/dashboard/quote', quote.id]);
	}
}
