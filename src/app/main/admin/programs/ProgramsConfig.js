import React from 'react';
import { authRoles } from 'app/auth';

const ProgramsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/admin/programs',
			component: React.lazy(() => import('./Programs'))
		}
	]
};

export default ProgramsConfig;
