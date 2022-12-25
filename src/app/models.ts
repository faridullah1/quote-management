export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	company: boolean;
}

export interface Quote {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
	status: 'Draft' | 'Approved';
	items: QouteItem[];
}

export interface QouteItem {
	name: string;
	quantity: number;
	price: number;
	editable?: boolean;
}
