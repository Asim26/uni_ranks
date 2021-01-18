import React from 'react';
import { authRoles } from 'app/auth';

const ProgramsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.university,
	routes: [
		{
			path: '/university/programs',
			component: React.lazy(() => import('./Programs'))
		}
	]
};

export default ProgramsConfig;
