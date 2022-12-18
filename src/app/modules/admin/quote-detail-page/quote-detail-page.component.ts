import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Quote, QouteItem } from 'app/models';
import { QuoteService } from 'app/quote.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-quote-detail-page',
  templateUrl: './quote-detail-page.component.html',
  styleUrls: ['./quote-detail-page.component.scss']
})
export class QuoteDetailPageComponent {
	quote!: Quote;
	quoteId: string;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private toaster: ToastrService,
				private confirmationService: FuseConfirmationService,
				private quoteService: QuoteService)
	{
		this.quoteId = this.route.snapshot.paramMap.get('id') as string;
		if (this.quoteId) {
			this.getQuoteDetails(this.quoteId);
		}
		else
		{
			this.quote = {
				id: (this.quoteService.getAllQuotes().length + 1).toString(),
				name: '',
				status: 'Draft',
				startDate: new Date(),
				endDate: new Date(),
				items: []
			};
		}
	}

	getQuoteDetails(id: string): void {
		this.quote = this.quoteService.getQuote(id) as Quote;
	}

	onConfirm(): void {
		if (this.quoteId)
		{
			this.quoteService.updateQuote(this.quote);
			this.toaster.success('Quote updated successfully');
		}
		else
		{
			this.quoteService.addQuote(this.quote);
			this.toaster.success('New Quote added successfully');
		}

		this.router.navigateByUrl('dashboard');
	}

	onDeleteQuote(): void {
		const dialog = this.confirmationService.open({
			title: 'Delete Quote?',
			message: 'Are you sure, you want to delete this quote'
		});

		dialog.afterClosed().subscribe((action: 'confirmed' | 'cancelled') => {
			if (action === 'confirmed') {
				this.quoteService.deleteQuote(this.quote);
				this.router.navigateByUrl('dashboard');
				this.toaster.success('Quote deleted successfully');
			}
		});
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
