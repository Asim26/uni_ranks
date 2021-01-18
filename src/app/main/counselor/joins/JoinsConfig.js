import React from 'react';
import { authRoles } from 'app/auth';

const JoinsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.counselor,
	routes: [
		{
			path: '/counselor/participants',
			component: React.lazy(() => import('./Joins'))
		}
	]
};

export default JoinsConfig;
