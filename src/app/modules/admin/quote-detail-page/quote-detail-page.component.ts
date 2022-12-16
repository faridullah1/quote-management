import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote, QouteItem } from 'app/models';
import { QuoteService } from 'app/quote.service';


@Component({
  selector: 'app-quote-detail-page',
  templateUrl: './quote-detail-page.component.html',
  styleUrls: ['./quote-detail-page.component.scss']
})
export class QuoteDetailPageComponent {
	quote!: Quote;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private quoteService: QuoteService)
	{
		const quoteId = this.route.snapshot.paramMap.get('id') as string;
		this.getQuoteDetails(quoteId);
	}

	getQuoteDetails(id: string): void {
		this.quote = this.quoteService.getQuote(id) as Quote;
	}

	onConfirm(): void {
		this.quoteService.setQuote(this.quote);
		this.router.navigateByUrl('dashboard');
	}

	onDeleteQuote(): void {
		this.quoteService.deleteQuote(this.quote);
		this.router.navigateByUrl('dashboard');
	}

	onAddItem(): void {
		this.quote.items.push({
			name: '', price: 0, quantity: 0, editable: true
		});
	}

	onEdit(item: QouteItem): void {
		for (const i of this.quote.items) {
			i.editable = false;
		}

		item.editable = true;
	}

	onDone(item: QouteItem): void {
		item.editable = false;
	}

	onDeleteQuoteItem(item: QouteItem): void {
		const idx = this.quote.items.indexOf(item);
		this.quote.items.splice(idx, 1);
	}
}
