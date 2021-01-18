import React from 'react';
import { authRoles } from 'app/auth';

const CurrenciesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/admin/currencies',
			component: React.lazy(() => import('./Currencies'))
		}
	]
};

export default CurrenciesConfig;
