import React from 'react';
import { authRoles } from 'app/auth';

const WebinarsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.university,
	routes: [
		{
			path: '/university/webinars',
			component: React.lazy(() => import('./Webinars'))
		}
	]
};

export default WebinarsConfig;
