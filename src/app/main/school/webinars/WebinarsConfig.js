import React from 'react';
import { authRoles } from 'app/auth';

const WebinarsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.school,
	routes: [
		{
			path: '/school/webinars',
			component: React.lazy(() => import('./Webinars'))
		}
	]
};

export default WebinarsConfig;
