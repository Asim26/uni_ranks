import React from 'react';
import { authRoles } from 'app/auth';

const StatisticsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.counselor,
	routes: [
		{
			path: '/counselor/statistics',
			component: React.lazy(() => import('./Statistics'))
		}
	]
};

export default StatisticsConfig;
