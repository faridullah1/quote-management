import { Injectable } from '@angular/core';
import { Quote } from './models';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {
	private quotes: Quote[];

  	constructor() {
		this.quotes = [
			{ id: '1', name: 'Testing Quote 1', startDate: new Date(), endDate: new Date(), status: 'Approved',
				items: [
					{ name: 'Test Item', price: 1000, quantity: 2 },
					{ name: 'Test Item', price: 1000, quantity: 2 },
					{ name: 'Test Item', price: 1000, quantity: 2 }
				]
			},
			{ id: '2', name: 'Dummy Quote', startDate: new Date(), endDate: new Date(), status: 'Draft', items: [] },
			{ id: '3', name: 'Another Quote', startDate: new Date(), endDate: new Date(), status: 'Draft', items: [] }
		];
	}

	getAllQuotes(): Quote[] {
		return this.quotes;
	}

	addQuote(quote: Quote): void {
		this.quotes.push(quote);
	}

	getQuote(id: string): Quote | undefined {
		return this.quotes.find(quote => quote.id === id);
	}

	updateQuote(quote: Quote): void {
		const idx = this.quotes.indexOf(quote);
		this.quotes[idx] = quote;
	}

	deleteQuote(quote: Quote): void {
		const idx = this.quotes.indexOf(quote);
		this.quotes.splice(idx, 1);
	}
}
