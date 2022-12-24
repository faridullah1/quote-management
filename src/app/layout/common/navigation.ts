import { Navigation } from 'app/core/navigation/navigation.types';


export class QuoteManagementAppNavigation
{
    // main navigation
    public static navigation: Navigation = {
		default: [
			{
				type: 'basic',
				icon: 'dashboard',
				link: 'quotes',
				title: 'Dashboard',
				id: 'dashboard',
			}
		],
		horizontal: [
			{
				type: 'basic',
				icon: 'dashboard',
				link: 'quotes',
				title: 'Dashboard',
				id: 'dashboard',
			}
		]
	};
}
