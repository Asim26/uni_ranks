import React from 'react';
import { authRoles } from 'app/auth';

const WorkshopsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.school,
	routes: [
		{
			path: '/school/workshops',
			component: React.lazy(() => import('./Workshops'))
		}
	]
};

export default WorkshopsConfig;
