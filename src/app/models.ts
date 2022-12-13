export interface GenericApiResponse {
	status: 'success' | 'failed';
	data: any;
};

export interface SubscriptionPlan {
	planId: number;
	title: string;
	price: number;
	coins: number;
	isRecommended: boolean;
	benefits: string[];
};
